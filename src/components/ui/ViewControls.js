import React from 'react'
import { connect } from 'react-redux'
import Popup from 'reactjs-popup'
import { Trans, useTranslation } from 'react-i18next';

import './ViewControls.css'

import { viewOptionsForSorting, SORTER_TYPES, SORTER_DESCRIPTIONS } from '../../store/sorters'
import { viewOptionsForFiltering, FILTER_TYPES, FILTER_DESCRIPTIONS } from '../../store/filters'

const ViewControls = ({
  setUI, resetUI,
  view, sort, filter, noScaling, weeks, totals,
  isMobile
}) => {
  const { t } = useTranslation();

  let viewOptions = {}
  viewOptions = viewOptionsForSorting(sort, viewOptions)
  viewOptions = viewOptionsForFiltering(filter, viewOptions)

  const filterDescription = t(`filter.description.${viewOptions.filter}`, viewOptions.filterDescription)
  const sortDescription = t(`sort.description.${viewOptions.sort}`, viewOptions.sortDescription)

  return (
    <div className='ViewControls'>
      <Popup
        tooltip
        position={'bottom center'}
        arrow={false}
        closeOnDocumentClick
        className='ViewControls-popup'
        overlayStyle={{
          zIndex: 1000
        }}
        contentStyle={{
          zIndex: 1001,
          backgroundColor: 'inherit',
          color: 'inherit',
          border: 'none',
          minWidth: '27em'
        }}
        trigger={
          <span className='ViewControls-trigger'>
            <Trans i18nKey='view_description.view_description'>
              <b>{{filter: filterDescription}}</b> sorted by <b>{{sort: sortDescription}}</b>
            </Trans>
          </span>
        }
      >
      {close => (
        <div className='ViewControls-popup form'>
          <div className='form-row'>
            <div className='form-label'><Trans i18nKey='view_controls.show_label'>Show</Trans></div>
            <div className='form-field'>
              <select value={viewOptions.filter || ''} onChange={(event) => setUI({filter: event.target.value})}>
                {FILTER_TYPES.map(option => (
                  <option key={option} value={option}>{t(`filter.description.${option}`, FILTER_DESCRIPTIONS[option])}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-label'><Trans i18nKey='view_controls.sort_label'>Show</Trans></div>
            <div className='form-field'>
              <select value={viewOptions.sort || ''} onChange={(event) => setUI({sort: event.target.value})}>
                {SORTER_TYPES.map(option => (
                  <option key={option} value={option}>{t(`sort.description.${option}`, SORTER_DESCRIPTIONS[option])}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-label'><Trans i18nKey='view_controls.weeks_label'>Limit To</Trans></div>
            <div className='form-field'>
              <select value={weeks || ''} onChange={(event) => setUI({weeks: event.target.value})}>
                <option value={''}>{t(`weeks.description.fit`, 'What fits on screen')}</option>
                <option value={'four'}>{t(`weeks.description.four`, 'Last 4 weeks')}</option>
                <option value={'six'}>{t(`weeks.description.six`, 'Last 6 weeks')}</option>
                <option value={'eight'}>{t(`weeks.description.eight`, 'Last 8 weeks')}</option>
                <option value={'all'}>{t(`weeks.description.all`, 'All available dates')}</option>
              </select>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-label'><Trans i18nKey='view_controls.view_label'>Style</Trans></div>
            <div className='form-field'>
              <select value={view || ''} onChange={(event) => setUI({view: event.target.value})}>
              <option value={undefined}>{t(`view.description.compact`, 'Compact')}</option>
                <option value={'classic'}>{t(`view.description.classic`, 'Classic')}</option>
              </select>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-label'>
              <input
                type='checkbox' id='totals' name='noScaling' checked={!!totals}
                onChange={(event) => setUI({totals: event.target.checked})}
              />
            </div>
            <div className='form-field'>
              <label htmlFor='totals'><Trans i18nKey='view_controls.totals_label'>Show Totals</Trans></label>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-label'>
              <input
                type='checkbox' id='noScaling' name='noScaling' checked={!!noScaling}
                onChange={(event) => setUI({noScaling: event.target.checked})}
              />
            </div>
            <div className='form-field'>
              <label htmlFor='noScaling'><Trans i18nKey='view_controls.no_scaling_label'>Preserve vertical scale</Trans></label>
            </div>
          </div>

          <div className='form-row form-single buttons'>
            <button onClick={() => { resetUI(); close() }}><Trans i18nKey='view_controls.reset_button'>Reset to defaults</Trans></button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => close()}><Trans i18nKey='view_controls.done_button'>Done</Trans></button>
          </div>

        </div>
      )}
      </Popup>

    </div>
  )
}

export default connect(
  (state, ownProps) => ({
    view: state.ui.view,
    sort: state.ui.sort,
    filter: state.ui.filter,
    weeks: state.ui.weeks,
    totals: state.ui.totals,
    noScaling: state.ui.noScaling
  }),
  (dispatch) => ({
    setUI: (values) => dispatch({ type: 'UI.SET', values }),
    resetUI: () => dispatch({ type: 'UI.RESET' }),
  })
)(ViewControls)
