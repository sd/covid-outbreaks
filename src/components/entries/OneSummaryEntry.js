import React from 'react'
import classNames from 'classnames'
import numeral from 'numeral'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'

import './OneSummaryEntry.css'

import DailySparklineChart from './DailySparklineChart'
import OutbreakTable from './OutbreakTable'
import { Trans, useTranslation } from 'react-i18next';
import Information from '../ui/Information'
import { TableViewContext } from '../TableView'

export const DEATHS_SCALE = 10
export const CASES_SCALE = 100

const OneTableEntry = ({
  entry, index, dates,
  comparisonEntry,
  pinned, expanded, sideBySide,
  pinEntry, unpinEntry, expandEntry, collapseEntry, isMobile
}) => {
  const { setEntryHeight } = React.useContext(TableViewContext)
  const entryRef = React.useRef()
  React.useEffect(() => {
    setEntryHeight(entry.code, index, entryRef.current.getBoundingClientRect().height)
  })

  const { t, i18n } = useTranslation();

  if (!entry.daily.deaths[dates[dates.length - 1]] && !entry.daily.cases[dates[dates.length - 1]]) {
    dates = dates.slice(0, dates.length - 2)
  }

  let comparisonOffset = 0

  if (comparisonEntry) {
    if (comparisonEntry.code === entry.code) {
      comparisonEntry = undefined
    } else if (entry.keyDates.death5 && comparisonEntry.keyDates.death5) {
      comparisonOffset = Math.ceil((entry.keyDates.death5.getTime() - comparisonEntry.keyDates.death5.getTime()) / (1000*60*60*24))
    }
  }

  return (
    <div ref={entryRef} className={classNames('SummaryView-row', { pinned, expanded })}>
      <div className='SummaryView-row-inner'>
        <div className='chart' style={{width: '15em'}}>
          <DailySparklineChart
            entry={entry} dates={dates}
            pointsToShow={21} aspectRatio={2}
            comparisonEntry={comparisonEntry} comparisonOffset={comparisonOffset}
          />
        </div>

        <div className='title'>
          <span className='name'>
            {entry[`${i18n.language}Name`] || entry.name || entry.code}
          </span>
          <span className='flag'>{entry.emoji}</span>
        </div>

        <div className='metrics'>
          {entry.latestOutbreakDay.deaths &&
            <section className='outbreakDay'>
              <Trans i18nKey='entry.outbreak_day'>
              day {{ day: entry.latestOutbreakDay.deaths }}
              </Trans>
              <Information content='numbers' />
            </section>
          }
          {entry.latestAcceleration.deaths &&
            <section className='velocitySummary acceleration'>
               <Trans i18nKey='entry.days_to_tenx'>
                 <AccelerationWithStyles value={1 / entry.latestAcceleration.deaths} arrows={false} colors={false} format={'0,000.0'} /> days to 10x
               </Trans>
              <Information content='numbers' />
            </section>
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
            {entry.latestDaily.deaths &&
              <div>
                {dates.slice(-4).reverse().map(date => (
                  <section key={date}>
                    +{numeral(entry.daily.deaths[date]).format('0,000')}
                  </section>
                ))}
              </div>
            }
            {!entry.latestTotal.deaths &&
              <section>
                <Trans i18nKey='entry.deaths_total_no_deaths'>
                  no deaths
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
              <OutbreakTable entry={entry} dates={dates} />
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

export const VelocityWithStyles = ({value}) => {
  return (
    <span className={classNames('velocity', {
      // good: value < 1.5,
      // medium: value > 2,
      // bad: value > 4,
      // terrible: value > 10
    })}
    >
    {value
      ? `${numeral(value).format('0,000.00')}`
      : <span>&nbsp;</span>
    }
    </span>
  )
}

export const AccelerationWithStyles = ({value, arrows = true, colors = true, isPercent = false, format}) => {
  return <NumberWithStyles value={value} className='acceleration' arrows={arrows} percent={isPercent} colors={colors} format={format} />
}

export const NumberWithStyles = ({value, className, arrows = false, percent = false, colors = false, format}) => {
  if (percent) {
    return (
      <span className={classNames(className, {
        increasing: colors && value > 1,
        decreasing: colors && value < 1
      })}
      >
        {value > 1 &&
          <span>
            {arrows && <span className='arrow'>▲</span>}
            {numeral((value - 1) * 100).format(format || '0,000.0')}%
          </span>
        }
        {value < 1 &&
          <span>
            {arrows && <span className='arrow'>▼</span>}
            {numeral((1 - value) * 100).format(format || '0,000.0')}%
          </span>
        }
        {!value && <span>&nbsp;</span>}
      </span>
    )
  } else {
    return (
      <span className={classNames(className, {
        increasing: colors && value > 0,
        decreasing: colors && value < 0
      })}
      >
        {value > 0 &&
          <span>
            {arrows && <span className='arrow'>▲</span>}
            {numeral(value).format(format || '0,000.00')}
          </span>
        }
        {value === 0 && <span>&nbsp;</span>}
        {value < 0 &&
          <span>
            {arrows && <span className='arrow'>▼</span>}
            {numeral(value).format(format || '0,000.00')}
          </span>
        }
        {!value && <span>&nbsp;</span>}
      </span>
    )
  }
}

export default OneTableEntry
