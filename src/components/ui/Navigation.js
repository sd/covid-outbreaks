import React from 'react'
import { connect } from 'react-redux'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import Popup from 'reactjs-popup'
import { Trans, useTranslation } from 'react-i18next';
import KeyboardEventHandler from 'react-keyboard-event-handler'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

import './Navigation.css'

const Navigation = ({sort, setUI, resetUI}) => {
  const { t } = useTranslation()
  const searchRef = React.useRef()
  const history = useHistory()
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  // React.useEffect(() => {
  //   setEntryHeight(entry.code, index, entryRef.current.getBoundingClientRect().height)
  // })

  const search = query.get('search')
  const setSearch = (value) => {
    if (value === undefined || value === null) {
      query.delete('search')
      history.push({search: query.toString()})
    } else {
      query.set('search', value)
      history.push({search: query.toString()})
    }
  }
  const handleSearchClick = () => {
    setSearch('')
    window.setTimeout(() => {searchRef.current && searchRef.current.focus()}, 1)
  }


  const handleFindKey = (key, event) => {
    if (key === 'ctrl+f' || key === 'meta+f') {
      setSearch('')
      window.setTimeout(() => {searchRef.current && searchRef.current.focus()}, 1)
    } else if (key === 'esc') {
      setSearch(undefined)
    }
    event.stopPropagation()
    event.preventDefault()
  }

  return (
    <div className='Navigation'>
      <section>
        <NavLink to="/">Top</NavLink>
      </section>
      <section>
        <NavLink to="/all">All</NavLink>
      </section>
      <section>
        <NavLink to="/euro">Europe</NavLink>
      </section>
      <section>
        <NavLink to="/usa">USA</NavLink>
      </section>
      <section>
        <NavLink to="/latam">Latam</NavLink>
      </section>
      <section>
        <NavLink to="/asia">Asia/Pacific</NavLink>
      </section>
      <section>
        {(search === null || search === undefined) &&
          <section className='search'>
            <button onClick={handleSearchClick}>
              <FontAwesomeIcon icon={faSearch} />&nbsp;
              <Trans i18nKey='view_controls.search_button'>Search</Trans>
            </button>
          </section>
        }
        {search !== null && search !== undefined &&
          <section className='search'>
            <FontAwesomeIcon icon={faSearch} />&nbsp;
            <input ref={searchRef} type='text' value={search} onChange={(event) => setSearch(event.target.value)}/>
            <button onClick={() => setSearch(undefined)}>
              <FontAwesomeIcon icon={faTimes} />&nbsp;
            </button>
          </section>
        }
      </section>
      {/* <section>
        <Popup
          tooltip
          position={'bottom center'}
          arrow={false}
          closeOnDocumentClick
          className='Navigation-popup'
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
            <button>more</button>
          }
        >
        {close => (
          <div className='Navigation-popup form'>
            <section>
              <NavLink to="/africa">Africa</NavLink>
            </section>
            <section>
              <NavLink to="/seasia">Southeast Asia</NavLink>
            </section>
            <section>
              <NavLink to="/meast">Middle East</NavLink>
            </section>
            <section>
              <NavLink to="/namer">North America</NavLink>
            </section>
            <section>
              <NavLink to="/carib">Caribbean</NavLink>
            </section>
          </div>
        )}
        </Popup>
      </section> */}
{/*
              <FontAwesomeIcon icon={faFilter} />&nbsp;
            <div className='form-row'>
              <div className='form-label'><Trans i18nKey='view_controls.sort_label'>Show</Trans></div>
              <div className='form-field'>
                <select value={viewOptions.sort || ''} onChange={(event) => setUI({sort: event.target.value})}>
                  {SORTER_TYPES.map(option => (
                    <option key={option} value={option}>{t(`sort.description.${option}`, SORTER_DESCRIPTIONS[option])}</option>
                  ))}
                </select>
              </div>
            </div> */}

      <KeyboardEventHandler
        handleKeys={['ctrl+f', 'meta+f', 'esc']}
        handleFocusableElements={true}
        onKeyEvent={handleFindKey}
      />

    </div>
  )
}

export default connect(
  (state, ownProps) => ({
    sort: state.ui.sort,
  }),
  (dispatch, props) => ({
    setUI: (values) => {
      props.listRef && props.listRef.current.resetAfterIndex(0)
      dispatch({ type: 'UI.SET', values })
    },
    resetUI: () => {
      props.listRef && props.listRef.current.resetAfterIndex(0)
      dispatch({ type: 'UI.RESET' })
    },
  })
)(Navigation)
