import React from 'react'
import { connect } from 'react-redux'
import Popup from 'reactjs-popup'

import './ViewControls.css'

import { formatDateMonthDD } from '../utils/dateFormats'

import { viewOptionsForSorting, SORTER_TYPES, SORTER_DESCRIPTIONS } from '../store/sorters'
import { viewOptionsForFiltering, FILTER_TYPES, FILTER_DESCRIPTIONS } from '../store/filters'

const ViewControls = ({
  lastDate, lastPreliminaryDate,
  sort, setSort,
  filter, setFilter,
  noScaling, setNoScaling,
  isMobile
}) => {
  let viewOptions = {}
  viewOptions = viewOptionsForSorting(sort, viewOptions)
  viewOptions = viewOptionsForFiltering(filter, viewOptions)

  if (!lastDate) return null

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
          minWidth: '20em'
        }}
        trigger={
          <span className='ViewControls-trigger'>
            <b>{FILTER_DESCRIPTIONS[viewOptions.filter]}</b> sorted by <b>{SORTER_DESCRIPTIONS[viewOptions.sort]}</b>
          </span>
        }
      >
      {close => (
        <div className='ViewControls-popup form'>
          <div className='form-row'>
            <div className='form-label'>Show</div>
            <div className='form-field'>
              <select value={viewOptions.filter} onChange={(event) => setFilter(event.target.value)}>
                {FILTER_TYPES.map(option => (
                  <option value={option}>{FILTER_DESCRIPTIONS[option]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-label'>Sort by </div>
            <div className='form-field'>
              <select value={viewOptions.sort} onChange={(event) => setSort(event.target.value)}>
                {SORTER_TYPES.map(option => (
                  <option value={option}>{SORTER_DESCRIPTIONS[option]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-label'>
              <input
                type='checkbox' id='noScaling' name='noScaling' checked={!!noScaling}
                onChange={(event) => setNoScaling(event.target.checked)}
              />
            </div>
            <div className='form-field'>
              <label htmlFor='noScaling'>Preserve vertical scale</label>
            </div>
          </div>

          <div className='form-row form-single'>
            <button onClick={() => close()}>Done</button>
          </div>

        </div>
      )}
    </Popup>

    <span className='segment'>
      <span className='date'>
        {' as of '}
        {formatDateMonthDD(lastDate)}
      </span>
      {lastPreliminaryDate && (
        <span className='preliminary preliminaryDate'>
          { isMobile ? ' (+ prelim. ' : ' (preliminary for ' }
          {formatDateMonthDD(lastPreliminaryDate)}
          { ')' }
        </span>
      )}
    </span>


      {/* <span className='segment filtering'>
        <SelectionPopup
          selected={viewOptions.filter}
          options={FILTER_TYPES}
          descriptions={FILTER_DESCRIPTIONS}
          title='Filtering options'
          onSelect={(option) => setFilter(option)}
        />
      </span>
      <span className='segment sorting'>
        {' sorted by '}
        <SelectionPopup
          selected={viewOptions.sort}
          options={SORTER_TYPES}
          descriptions={SORTER_DESCRIPTIONS}
          title='Sorting options'
          onSelect={(option) => setSort(option)}
        />
      </span> */}
    </div>
  )
}

export default connect(
  (state, ownProps) => ({
    lastDate: state.csseData.lastDate,
    lastPreliminaryDate: state.csseData.lastPreliminaryDate,
    sort: state.ui.sort,
    filter: state.ui.filter,
    noScaling: state.ui.noScaling
  }),
  (dispatch) => ({
    setSort: (value) => dispatch({ type: 'UI.SET_SORT', value }),
    setFilter: (value) => dispatch({ type: 'UI.SET_FILTER', value }),
    setNoScaling: (value) => dispatch({ type: 'UI.SET_NO_SCALING', value }),
  })
)(ViewControls)
