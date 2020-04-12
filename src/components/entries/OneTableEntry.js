import React from 'react'
import classNames from 'classnames'
import numeral from 'numeral'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { DateTime } from 'luxon'
import { Link, useHistory } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next';

import './OneTableEntry.css'

import DailySparklineChart from './DailySparklineChart'
import AccelerationChart from './AccelerationChart'
import OutbreakTable from './OutbreakTable'
import { AccelerationWithStyles } from '../ui/NumbersWithStyles'

export const DEATHS_SCALE = 10
export const CASES_SCALE = 100

const OneTableEntry = ({
  entry, comparisonEntry, dates, allDates,
  ui, pinned, expanded, permalinked, expandEntry, collapseEntry,
  isMobile, isTablet
}) => {
  const { i18n, t } = useTranslation();
  const history = useHistory();

  let weeksToShow
  if (isMobile) {
    weeksToShow = expanded ? 6 : 4
  } else {
    weeksToShow = expanded ? 14 : 7
  }

  let chartDates = allDates.slice(-(7 * weeksToShow))
  let last4Dates = dates.slice(isMobile ? -3 : -4)
  let yesterday = false
  if (entry.daily.deaths[dates[dates.length - 1]] === undefined) {
    yesterday = true
    last4Dates = dates.slice(-5, -1)
  }

  if (isMobile) {
    last4Dates = last4Dates.slice(-3)
  }

  let comparisonOffset = 0

  if (comparisonEntry) {
    if (comparisonEntry.code === entry.code) {
      comparisonEntry = undefined
    } else if (entry.keyDates.deaths10 && comparisonEntry.keyDates.deaths10) {
      let d1 = DateTime.fromISO(entry.keyDates.deaths10)
      let d2 = DateTime.fromISO(comparisonEntry.keyDates.deaths10)
      comparisonOffset = d1.diff(d2, 'days').days
    }
  }

  const clickHandler = (event) => { history.push(`/${entry.code}`); event.preventDefault(); event.stopPropagation() }
  const toggleExpansionHandler = (event) => { expanded ? collapseEntry(entry) : expandEntry(entry); event.preventDefault(); event.stopPropagation() }

  return (
    <div className='TableView-row-outer' >
      <div
        className={classNames('TableView-row', { pinned, expanded })}
        onClick={toggleExpansionHandler}
      >
        <section className='title'>
          <span className='name'>
            {entry[`${i18n.language}Name`] || entry.name || entry.code}
          </span>
          <span className='flag' title={entry.code}>{entry.emoji}</span>
        </section>

        {expanded && !permalinked &&
          <section className='tools'>
            <span className='permalink'>
              <Link to={`/${entry.code}`} onClick={clickHandler}>
                <Trans i18nKey='entry.permalink'>permalink</Trans>
              </Link>
            </span>
            <button onClick={toggleExpansionHandler}>
              <FontAwesomeIcon icon={faMinusSquare} />
            </button>
          </section>
        }
        {!expanded && !permalinked &&
          <section className='tools'>
            <button onClick={toggleExpansionHandler}>
              <FontAwesomeIcon icon={faPlusSquare} />
            </button>
          </section>
        }

        <section className='outbreakDay'>
          {entry.latestOutbreakDay.deaths
            ? <Trans i18nKey='entry.outbreak_day'>
                day {{ day: entry.latestOutbreakDay.deaths }}
              </Trans>
            : '-'
          }
        </section>

        <section className='deaths'>
          {entry.latestTotal.deaths > 0
            ? <Trans i18nKey='entry.deaths_total'>
                {{total: numeral(entry.latestTotal.deaths).format('0,000')}} deaths
              </Trans>

            : <Trans i18nKey='entry.deaths_total_no_deaths'>
                no deaths
              </Trans>
          }
          {yesterday &&
            <span className='yesterday'><Trans i18nKey='entry.yesterday'>Yesterday</Trans></span>
          }
        </section>

        <section className='latestDaily'>
          {entry.latestDaily.deaths &&
            last4Dates.reverse().map((date, index) => (
              <span key={date} className={`index-${index + 1}`}>
                {entry.daily.deaths[date]
                  ? `+${numeral(entry.daily.deaths[date]).format('0,000')}`
                  : t('entry.not_available', 'n/a')
                }
              </span>
            )
          )}
        </section>

        <section className='acceleration'>
          {entry.latestAcceleration.deaths > 0 &&
            <div>
              <section className='velocitySummary acceleration'>
                <Trans i18nKey='entry.up_tenx'>
                  <AccelerationWithStyles value={1 / entry.latestAcceleration.deaths} arrows={false} colors={true} abs={true} format={'0,000'} /> days to 10x
                </Trans>
              </section>
            </div>
          }
          {entry.latestAcceleration.deaths < 0 &&
            <div>
              <section className='velocitySummary acceleration'>
                <Trans i18nKey='entry.down_tenx'>
                  <AccelerationWithStyles value={1 / entry.latestAcceleration.deaths} arrows={false} colors={true} abs={true} format={'0,000'} /> days to 1/10<sup>th</sup>
                </Trans>
              </section>
            </div>
          }
        </section>

        {!expanded &&
          <>
            <section className='deathsChart'>
              <DailySparklineChart
                simple={true}
                entry={entry} dates={chartDates} ui={ui}
                comparisonEntry={comparisonEntry} comparisonOffset={comparisonOffset}
              />
            </section>
            <section className='accelerationChart'>
              <AccelerationChart
                simple={true}
                entry={entry} dates={chartDates} ui={ui}
              />
            </section>
          </>
        }

      </div>

      {expanded &&
        <div className='expandedInfo'>
          <section className='deathsChart'>
            <DailySparklineChart
              entry={entry} dates={chartDates} ui={ui}
              comparisonEntry={comparisonEntry} comparisonOffset={comparisonOffset}
            />
          </section>
          <section className='accelerationChart'>
            <AccelerationChart
              entry={entry} dates={chartDates} ui={ui}
            />
          </section>

          {entry && (entry.links || entry.population) &&
            <section>
              {entry.links && (
                <>
                  <b><Trans i18nKey='entry.links_label'>Links:</Trans>&nbsp;&nbsp;</b>
                  {Object.keys(entry.links).map(key =>
                    <span key={key}><a href={entry.links[key]} target='_blank' rel="noopener noreferrer">{key}</a>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  )}
                </>
              )}
              {entry.links && entry.population && <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
              {entry.population && (
                <>
                  <b>
                    <Trans i18nKey='entry.population_label'>Population:</Trans>&nbsp;
                  </b>
                  {numeral(entry.population).format('0,000')}M
                </>
              )}
            </section>
          }

          <section>
            <OutbreakTable entry={entry} dates={allDates} />
          </section>
        </div>
      }
    </div>
  )
}

export default OneTableEntry
