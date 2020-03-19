import React from 'react'
import classNames from 'classnames'
import numeral from 'numeral'

import OutbreakSparklineSVG from './OutbreakSparklineSVG'
import OutbreakTable from './OutbreakTable'
import { Trans, useTranslation } from 'react-i18next';
import Information from '../ui/Information'

const OneTableEntry = ({
  entry, dates,
  pinned, expanded, sideBySide,
  pinEntry, unpinEntry, expandEntry, collapseEntry, isMobile
}) => {
  const { t, i18n } = useTranslation();

  return (
    <div key={entry.name} className={classNames('TableView-row', { pinned, expanded })}>

      <OutbreakSparklineSVG entry={entry} dates={dates} sideBySide={sideBySide} />

      <div className='TableView-title'>
        <div className='tools'>
          {pinEntry && (
            pinned
            ? <button className='segment activated' onClick={ () => unpinEntry(entry) }>{t('entry.unpin_button', 'pinned to top')}</button>
            : <button className='segment' onClick={ () => pinEntry(entry) }>{t('entry.pin_button', 'pinned')}</button>
          )}
          { expandEntry && (
            expanded
            ? <button className='segment activated' onClick={ () => collapseEntry(entry) }>{t('entry.collapse_button', 'hide data')}</button>
            : <button className='segment' onClick={ () => expandEntry(entry) }>{t('entry.expand_button', 'show more')}</button>
          )}
        </div>

        <div className='title'>
          <span className='flag'>{entry.emoji}</span>
          <span className='name'>
            {entry[`${i18n.language}DisplayName`] || entry.displayName || entry.name}
            {entry.latestOutbreakDay.deaths &&
              <span className='outbreakDay'>
                { ' • ' }
                <Trans i18nKey='entry.outbreak_day'>
                day {{ day: entry.latestOutbreakDay.deaths }}
                </Trans>
                <Information content='numbers' />
              </span>
            }
          </span>
        </div>

        <div className='totals'>
          <div className='deaths'>
            {entry.latestTotal.deaths > 0 && entry.latestDaily.deaths > 0 &&
              <Trans i18nKey='entry.deaths_total_with_latest'>
                {{total: numeral(entry.latestTotal.deaths).format('0,000')}} deaths (+{{latest: numeral(entry.latestDaily.deaths).format('0,000')}})
              </Trans>
            }
            {entry.latestTotal.deaths > 0 && !entry.latestDaily.deaths &&
              <Trans i18nKey='entry.deaths_total_with_no_change'>
                {{total: numeral(entry.latestTotal.deaths).format('0,000')}} deaths
              </Trans>
            }
            {!entry.latestTotal.deaths &&
              <Trans i18nKey='entry.deaths_total_no_deaths'>
                no deaths
              </Trans>
            }
          </div>

          {entry.latestVelocity.deaths && entry.latestVelocity.deaths !== 1 &&
            <div className='velocitySummary velocity'>
              <Trans i18nKey='entry.velocity_description'>
                Growing <VelocityWithStyles value={entry.latestVelocity.deaths} />/week
              </Trans>
              {entry.latestAcceleration.deaths &&
                <span>&nbsp;&nbsp;<AccelerationWithStyles value={entry.latestAcceleration.deaths} /></span>
              }
            </div>
          }

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

        </div>
      </div>

      {expanded && (
        <div className='TableView-more'>
          {entry && entry.links  && (
            <section>
              <b><Trans i18nKey='entry.links_label'>Links:</Trans>&nbsp;&nbsp;</b>
              {Object.keys(entry.links).map(key =>
                <span key={key}><a href={entry.links[key]} target='_blank' rel="noopener noreferrer">{key}</a>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              )}
            </section>
          )}

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
      ? `${numeral(value).format('0,000.0')}x`
      : <span>&nbsp;</span>
    }
    </span>
  )
}

export const AccelerationWithStyles = ({value}) => {
  return (
    <span className={classNames('acceleration', {
      increasing: value > 0,
      decreasing: value < 0
    })}
    >
      {value > 0 && <span><span className='arrow'>▲</span>{numeral(value).format('0,000.00')}</span>}
      {value === 0 && <span>&nbsp;</span>}
      {value < 0 && <span><span className='arrow'>▼</span>{numeral(value).format('0,000.00')}</span>}
      {!value && <span>&nbsp;</span>}
    </span>
  )
}

export default React.memo(OneTableEntry)
