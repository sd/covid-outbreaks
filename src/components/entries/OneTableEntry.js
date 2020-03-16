import React from 'react'
import classNames from 'classnames'
import formatNumber from '../../utils/formatNumber'

import OutbreakSparklineSVG from './OutbreakSparklineSVG'
import OutbreakTable from './OutbreakTable'
import { Trans, useTranslation } from 'react-i18next';


const OneTableEntry = ({
  entry, dates,
  pinned, expanded, sideBySide,
  pinEntry, unpinEntry, expandEntry, collapseEntry
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
          <span className='name'>{entry[`${i18n.language}DisplayName`] || entry.displayName || entry.name}</span>
        </div>

        <div className='totals'>
          <div className='deaths'>
            {entry.latestTotal.deaths > 0 && entry.latestDaily.deaths > 0 &&
              <Trans i18nKey='entry.deaths_total_with_latest'>
                {{total: formatNumber(entry.latestTotal.deaths, i18n)}} deaths (+{{latest: formatNumber(entry.latestDaily.deaths, i18n)}})
              </Trans>
            }
            {entry.latestTotal.deaths > 0 && !entry.latestDaily.deaths &&
              <Trans i18nKey='entry.deaths_total_with_no_change'>
                {{total: formatNumber(entry.latestTotal.deaths, i18n)}} deaths
              </Trans>
            }
            {!entry.latestTotal.deaths &&
              <Trans i18nKey='entry.deaths_total_no_deaths'>
                no deaths
              </Trans>
            }
          </div>
          <div className='cases'>
          {entry.latestTotal.cases > 0 && entry.latestDaily.cases > 0 &&
              <Trans i18nKey='entry.cases_total_with_latest'>
                {{total: formatNumber(entry.latestTotal.cases, i18n)}} cases (+{{latest: formatNumber(entry.latestDaily.cases, i18n)}})
              </Trans>
            }
            {entry.latestTotal.cases > 0 && !entry.latestDaily.cases &&
              <Trans i18nKey='entry.cases_total_with_no_change'>
                {{total: formatNumber(entry.latestTotal.cases, i18n)}} cases
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
              <b>Includes data labeled as&nbsp;&nbsp;</b>
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

export default  React.memo(OneTableEntry)
