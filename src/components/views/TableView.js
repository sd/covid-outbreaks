import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

import "./Entries.css";

import OneTableEntry from "../entries/OneTableEntry";
import ListOfEntries from "../entries/ListOfEntries";

import { formatDateMonthDD } from "../../utils/dateFormats";
import { viewOptionsForSorting } from "../../store/sorters";
import { viewOptionsForFiltering, filterBySearch } from "../../store/filters";

const Goodbye = () => {
  return (
    <div
      style={{
        border: "2px solid red",
        backgroundColor: "#662222",
        color: "#cccccc",
        margin: "5px 15% 10px 15%",
      }}
    >
      <h2>This site is no longer active</h2>

      <p>
        After building and operating this site for more than 8 months, I've
        decided to stop updating it after November 12th.
      </p>

      <p>
        The number of reported deaths is no longer the leading indicator of
        COVID outbreaks, and there are plenty of good sites covering the data in
        great ways.
      </p>

      <p>
        For the USA, <a href="https://covidactnow.org/">Covid ActNow</a> is a
        great resource, and{" "}
        <a href="https://covidtracking.com/">The Covid Tracking Project</a>{" "}
        still is the best data source.
      </p>

      <p>
        For the world in general,{" "}
        <a href="https://www.nytimes.com/interactive/2020/world/coronavirus-maps.html">
          The New York Times
        </a>
        {" and "}
        <a href="https://www.ft.com/content/a2901ce8-5eb7-4633-b89c-cbdf5b386938">
          The Financial Times
        </a>
        have great charts and visualizations.
      </p>

      <p>Thank you for visiting all this time!</p>

      <p>
        -- <a href="https://twitter.com/sd/status/1327239408538497031">@sd</a>
      </p>
    </div>
  );
};

const TableView = ({
  loaded,
  loading,
  data,
  allDates,
  ui,
  filter,
  isMobile,
  isTablet,
  isDesktop,
  listRef,
  windowHeight,
}) => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  if (loaded) {
    const comparisonEntry = data.find(
      (entry) => entry.code === (ui.compareTo || "it")
    );

    let viewOptions = { hideAggregates: ui.hideAggregates };
    viewOptions = viewOptionsForSorting(ui.sort, viewOptions);
    viewOptions = viewOptionsForFiltering(filter, viewOptions);

    data = data.sort((a, b) => viewOptions.sorter(a, b, viewOptions));
    data = data.filter((a) => viewOptions.filterer(a, viewOptions));

    if (query.get("search")) {
      console.log("search", query.get("search"));
      data = data.filter((entry) =>
        filterBySearch(entry, query.get("search"), i18n.language)
      );
    }

    if (data === []) return null;

    let title = "";
    if (viewOptions && viewOptions.filter) {
      title = t(
        `filter.description.${viewOptions.filter}`,
        viewOptions.filterDescription
      );
    }

    let dates = allDates;

    const actualProps = {
      data,
      dates,
      allDates,
      comparisonEntry,
      viewOptions,
      ui,
      listRef,
      listHeight: windowHeight,
      defaultHeight: 58,
      isMobile,
      isTablet,
      isDesktop,
    };

    const HeaderComponent = () => (
      <>
        <Goodbye />
        {title && <h2>{title}</h2>}
        <h3>
          {allDates && (
            <Trans i18nKey={"view_description.as_of_date"}>
              As of {{ date: formatDateMonthDD(allDates.slice(-1)[0]) }}
            </Trans>
          )}
          {loading && (
            <span>
              &nbsp;
              <Trans i18nKey={"view_description.loading"}>Loading...</Trans>
            </span>
          )}
        </h3>
      </>
    );
    return (
      <div className="Entries TableView">
        <ListOfEntries
          {...actualProps}
          entryComponent={OneTableEntry}
          headerComponent={HeaderComponent}
        />
      </div>
    );
  } else {
    return (
      <div className="Entries TableView">
        <div className="Entries-loading">
          <h2>
            <Trans i18nKey={"general.loading"}>Loading...</Trans>
          </h2>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  loaded: state.data.loaded,
  loading: state.data.loading,
  data: state.data.data,
  allDates: state.data.allDates,
  ui: state.ui,
});

const ConnectedAllEntriesView = connect(mapStateToProps)(TableView);

export default ConnectedAllEntriesView;
