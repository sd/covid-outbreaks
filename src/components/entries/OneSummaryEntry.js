import React from 'react'
import classNames from 'classnames'
import numeral from 'numeral'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { DateTime } from 'luxon'

import './OneSummaryEntry.css'

import DailySparklineChart from './DailySparklineChart'
import OutbreakTable from './OutbreakTable'
import { Trans, useTranslation } from 'react-i18next';
import { TableViewContext } from '../TableView'
import { AccelerationWithStyles } from '../ui/NumbersWithStyles'

export const DEATHS_SCALE = 10
export const CASES_SCALE = 100

const OneSummaryEntry = ({
  entry, index, dates, allDates,
  comparisonEntry,
  pinned, expanded, ui,
  pinEntry, unpinEntry, expandEntry, collapseEntry, isMobile, isTablet
}) => {
  const { setEntryHeight } = React.useContext(TableViewContext)
  const entryRef = React.useRef()
  React.useEffect(() => {
    setEntryHeight(entry.code, index, entryRef.current.getBoundingClientRect().height)
  })

  const { t, i18n } = useTranslation();

  // if (!entry.daily.deaths[dates[dates.length - 1]]) {
  //   dates = dates.slice(0, dates.length - 1)
  // }

  let weeksToShow
  if (isMobile) {
    weeksToShow = expanded ? 8 : 5
  } else {
    weeksToShow = expanded ? 14 : 9
  }

  let chartDates = allDates.slice(-(7 * weeksToShow))

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

  return (
    <div ref={entryRef} className={classNames('SummaryView-row', { pinned, expanded })}>
      <div className='SummaryView-row-inner'>
        <div className='chart'>
          <DailySparklineChart
            entry={entry} dates={chartDates}
            aspectRatio={2} verticalScale={ entry.code === 'totals' ? 4 : undefined }
            comparisonEntry={comparisonEntry} comparisonOffset={comparisonOffset}
            ui={ui}
          />
        </div>

        <div className='title'>
          <span className='name'>
            {entry[`${i18n.language}Name`] || entry.name || entry.code}
          </span>
          <span className='flag' title={entry.code}>{entry.emoji}</span>
        </div>


        <div className='metrics'>
          {entry.latestDaily.deaths &&
            <div>
              {dates.slice(-4).reverse().map(date => (
                <section key={date}>
                  {entry.daily.deaths[date]
                    ? <span>+{numeral(entry.daily.deaths[date]).format('0,000')}</span>
                    : <span>n/a</span>
                  }
                </section>
              ))}
            </div>
          }
          {entry.latestAcceleration.deaths > 0 &&
            <div>
              <section className='velocitySummary acceleration'>
                <Trans i18nKey='entry.days_to_up_tenx'>
                  <AccelerationWithStyles value={1 / entry.latestAcceleration.deaths} arrows={false} colors={true} abs={true} format={'0,000.0'} /> days to go up 10x
                </Trans>
              </section>
            </div>
          }
          {entry.latestAcceleration.deaths < 0 &&
            <div>
              <section className='velocitySummary acceleration'>
                <Trans i18nKey='entry.days_to_down_tenx'>
                  <AccelerationWithStyles value={1 / entry.latestAcceleration.deaths} arrows={false} colors={true} abs={true} format={'0,000.0'} /> days to go down 10x
                </Trans>
              </section>
            </div>
          }
        </div>

        <div className='totals'>
          {!entry.latestTotal.deaths &&
            <div className='cases'>
              {entry.latestTotal.cases > 0 && entry.latestDaily.cases > 0 &&
                <Trans i18nKey='entry.cases_total_with_latest'>
                  {{total: numeral(entry.latestTotal.cases).format('0,000')}} cases (+{{latest: numeral(entry.latestDaily.cases).format('0,000')}})
                </Trans>
              }
              {entry.latestTotal.cases > 0 && !entry.latestDaily.cases &&
                <Trans i18nKey='entry.cases_total_with_no_change'>
                  {{total: numeral(entry.latestTotal.cases).format('0,000')}} cases
                </Trans>
              }
              {!entry.latestTotal.cases &&
                <Trans i18nKey='entry.cases_total_no_cases'>
                  no cases
                </Trans>
              }
            </div>
          }

          <div className='deaths'>
            {entry.latestTotal.deaths > 0 &&
              <section><b>
                <Trans i18nKey='entry.deaths_total'>
                  {{total: numeral(entry.latestTotal.deaths).format('0,000')}} deaths
                </Trans>
              </b></section>
            }
            {!entry.latestTotal.deaths &&
              <section>
                <Trans i18nKey='entry.deaths_total_no_deaths'>
                  no deaths
                </Trans>
              </section>
            }
            {entry.latestOutbreakDay.deaths &&
              <section className='outbreakDay'>
                &nbsp;•&nbsp;
                <Trans i18nKey='entry.outbreak_day'>
                day {{ day: entry.latestOutbreakDay.deaths }}
                </Trans>
              </section>
            }
          </div>

          {/* {entry.latestVelocity.deaths && entry.latestVelocity.deaths !== 1 &&
            <div className='velocitySummary velocity'>
              <Trans i18nKey='entry.velocity_description'>
                Growing <VelocityWithStyles value={entry.latestVelocity.deaths} />/week
              </Trans>
              {entry.latestAcceleration.deaths &&
                <span>&nbsp;&nbsp;<AccelerationWithStyles value={entry.latestAcceleration.deaths} /></span>
              }
            </div>
          } */}

        </div>

        <div className='tools'>
          {pinEntry && (
            pinned
            ? <button className='segment activated' onClick={ () => unpinEntry(entry) }>
                <FontAwesomeIcon icon={faThumbtack} style={{verticalAlign: 'text-bottom'}} />&nbsp;
                {t('entry.unpin_button', 'pinned to top')}
              </button>
            : <button className='segment' onClick={ () => pinEntry(entry) }>
                <FontAwesomeIcon icon={faThumbtack} style={{verticalAlign: 'text-bottom'}} />&nbsp;
                {t('entry.pin_button', 'pinned')}
              </button>
          )}
          { expandEntry && (
            expanded
            ? <button className='segment activated' onClick={ () => collapseEntry(entry) }>
                <FontAwesomeIcon icon={faMinusSquare} style={{verticalAlign: 'text-bottom'}} />&nbsp;
                {t('entry.collapse_button', 'hide data')}
              </button>
            : <button className='segment' onClick={ () => expandEntry(entry) }>
                <FontAwesomeIcon icon={faPlusSquare} style={{verticalAlign: 'text-bottom'}} />&nbsp;
                {t('entry.expand_button', 'show more')}
              </button>
          )}
        </div>

        {expanded && (
          <div className='more'>
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

            {entry && entry.sources && entry.sources.deaths && (
              <section>
                <b><Trans i18nKey='entry.includes_data_for'>Includes data labeled as</Trans></b>
                &nbsp;&nbsp;
                {entry.sources.deaths.map(name =>
                  <span key={name}>{name}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                )}
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default OneSummaryEntry
