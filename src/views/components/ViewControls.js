import React from 'react'
import { connect } from 'react-redux'

import SelectionPopup from '../../components/shared/SelectionPopup'
import { formatDateMonthDD } from '../../../utils/dateFormats'

import { viewOptionsForSorting, SORTER_TYPES, SORTER_DESCRIPTIONS } from '../../../store/sorters'
import { viewOptionsForFiltering, FILTER_TYPES, FILTER_DESCRIPTIONS } from '../../../store/filters'

const ViewControls = ({lastDate, lastPreliminaryDate, sort, setSort, filter, setFilter}) => {
  let viewOptions = {}
  viewOptions = viewOptionsForSorting(sort, viewOptions)
  viewOptions = viewOptionsForFiltering(filter, viewOptions)

  return (
    <h3>
      <span className='segment blockUnder600px'>
        <SelectionPopup
          selected={viewOptions.filter}
          options={FILTER_TYPES}
          descriptions={FILTER_DESCRIPTIONS}
          title='Filtering options'
          onSelect={(option) => setFilter(option)}
        />
      </span>
      <span className='segment blockUnder600px'>
        {' sorted by '}
        <SelectionPopup
          selected={viewOptions.sort}
          options={SORTER_TYPES}
          descriptions={SORTER_DESCRIPTIONS}
          title='Sorting options'
          onSelect={(option) => setSort(option)}
        />
      </span>
      <span className='segment blockUnder600px'>
        {' as of '}
        {formatDateMonthDD(lastDate)}
      </span>
      {lastPreliminaryDate && (
        <span className='segment blockUnder600px preliminary'>
          { ' (preliminary for ' }
          {formatDateMonthDD(lastPreliminaryDate)}
          { ')' })
        </span>
      )}
    </h3>
  )
}


const mapStateToProps = (state, ownProps) => ({
  lastDate: state.csseData.lastDate,
  lastPreliminaryDate: state.csseData.lastPreliminaryDate,
  sort: state.ui.sort,
  filter: state.ui.filter,
})

const mapDispatchToProps = (dispatch) => ({
  setSort: (value) => dispatch({ type: 'UI.SET_SORT', value }),
  setFilter: (value) => dispatch({ type: 'UI.SET_FILTER', value }),
})

const ConnectedViewControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewControls)

export default ConnectedViewControls
