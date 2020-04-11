import React from 'react'
import classNames from 'classnames'
import numeral from 'numeral'
import { DateTime } from 'luxon'
import { Link, useHistory } from 'react-router-dom'

import './OneTableEntry.css'

import DailySparklineChart from './DailySparklineChart'
import AccelerationChart from './AccelerationChart'
import { Trans, useTranslation } from 'react-i18next';
import { AccelerationWithStyles } from '../ui/NumbersWithStyles'

export const DEATHS_SCALE = 10
export const CASES_SCALE = 100

const OneTableEntry = ({
  entry, comparisonEntry, dates, allDates, ui, isMobile, isTablet
}) => {
  const { i18n } = useTranslation();
  const history = useHistory();

  // if (!entry.daily.deaths[dates[dates.length - 1]]) {
  //   dates = dates.slice(0, dates.length - 1)
  // }

  let weeksToShow
  if (isMobile) {
    weeksToShow = 4
  } else {
    weeksToShow = 7
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

  const clickHandler = (event) => { history.push(`/${entry.code}`); event.preventDefault(); event.stopPropagation() }

  return (
    <div className={classNames('TableView-row')} onClick={clickHandler}>
      <section className='title'>
        <span className='name'>
          <Link to={`/${entry.code}`} onClick={clickHandler}>
            {entry[`${i18n.language}Name`] || entry.name || entry.code}
          </Link>
        </span>
        <span className='flag' title={entry.code}>{entry.emoji}</span>
      </section>

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
      </section>

      <section className='latestDaily'>
        {entry.latestDaily.deaths &&
          dates.slice(-4).reverse().map(date => (
            <span key={date}>
              {entry.daily.deaths[date]
                ? <span>+{numeral(entry.daily.deaths[date]).format('0,000')}</span>
                : <span><Trans i18nKey='entry.not_available'>n/a</Trans></span>
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
                <AccelerationWithStyles value={1 / entry.latestAcceleration.deaths} arrows={false} colors={true} abs={true} format={'0,000'} /> to 10x
              </Trans>
            </section>
          </div>
        }
        {entry.latestAcceleration.deaths < 0 &&
          <div>
            <section className='velocitySummary acceleration'>
              <Trans i18nKey='entry.down_tenx'>
                <AccelerationWithStyles value={1 / entry.latestAcceleration.deaths} arrows={false} colors={true} abs={true} format={'0,000'} /> to 1/10<sup>th</sup>
              </Trans>
            </section>
          </div>
        }
      </section>

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

    </div>
  )
}

export default OneTableEntry
