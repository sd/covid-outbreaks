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

const titleSize = (title) => {
  if (title.length > 30) return 'title-xl'
  if (title.length > 24) return 'title-l'
  if (title.length > 19) return 'title-m'
  if (title.length > 0) return 'title-s'
  return 'title-xs';
}

export const accelerationSeverityClass = (acceleration) => {
  if (acceleration >=  0.1428)  return 'severity-bad-xl'  /* up in 7 days / 1 week */
  if (acceleration >=  0.0476)  return 'severity-bad-l'   /* up in 21 days / 3 weeks */
  if (acceleration >=  0.0204)  return 'severity-bad-m'   /* up in 49 days / 7 weeks */
  if (acceleration >=  0.0119)  return 'severity-bad-s'   /* up in 84 days / 12 weeks */
  if (acceleration >= -0.0089)  return 'severity-flat'    /* down in 112 days / 16 weeks */
  if (acceleration >= -0.0143) return 'severity-good-s'   /* down in 70 days / 10 weeks */
  if (acceleration >= -0.0238) return 'severity-good-m'   /* down in 42 days / 6 weeks */
  if (acceleration >= -0.0357) return 'severity-good-l'   /* down in 28 days / 4 weeks */
  return 'severity-good-xl'
}

const accelerationToWeeklyX = (acc) => {
  return Math.pow(Math.pow(10, acc), 7)
}

const OneTableEntry = ({
  entry, comparisonEntry, dates, allDates,
  ui, expanded, permalinked, expandEntry, collapseEntry,
  isMobile, isTablet
}) => {
  const { i18n, t } = useTranslation();
  const history = useHistory();

  let weeksToShow
  if (isMobile) {
    weeksToShow = expanded ? 10 : 4
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

  const title = entry[`${i18n.language}Name`] || entry.name || entry.code

  const clickHandler = (event) => { history.push(`/${entry.code}`); event.preventDefault(); event.stopPropagation() }
  const toggleExpansionHandler = (event) => { expanded ? collapseEntry(entry) : expandEntry(entry); event.preventDefault(); event.stopPropagation() }

  return (
    <div className='TableView-row-outer' >
      <div
        className={
          classNames(
            'TableView-row',
            accelerationSeverityClass(entry.latestAcceleration.deaths),
            { expanded }
          )
        }
        onClick={toggleExpansionHandler}
      >
        <section className='title'>
          <span className={classNames('name', titleSize(title))} title={`${titleSize(title)} ${title.length}`}>
            {title}
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
                {entry.daily.deaths[date] > 0
                  ? `+${numeral(entry.daily.deaths[date]).format('0,000')}`
                  : (
                    entry.daily.deaths[date] === 0
                      ? '0'
                      : t('entry.not_available', 'n/a')
                  )
                }
              </span>
            )
          )}
        </section>

        <section className={classNames('acceleration', accelerationSeverityClass(entry.latestAcceleration.deaths))}>
          {entry.latestAcceleration &&
            <Trans i18nKey='entry.x_per_week'>
              <AccelerationWithStyles value={accelerationToWeeklyX(entry.latestAcceleration.deaths)} arrows={false} colors={true} format={'0,000.0'} suffix='x' /> per week
            </Trans>
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
