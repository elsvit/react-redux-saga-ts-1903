import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {parseUrl, stringify} from 'query-string';
import * as React from 'react';
import ReactLoading from 'react-loading';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {bindActionCreators, Dispatch} from 'redux';

import {filterRestaurants, sortRestaurants} from 'services/utils';
import {GET_RESTAURANTS, getRestaurants, IRestaurant} from 'store/restaurants/restaurants';
import {IAppState} from 'store/store';
import scssVars from 'styles/_scss-vars.scss';
import {IBooleanObj} from 'types/IBaseEntities';
import Main from '../Main';
import RestaurantRow from './RestaurantRow';
import './styles.scss';

type TSelect = '' | 'sort' | 'filter';

interface IStateMap {
  loading: IBooleanObj
  restaurants: IRestaurant[]
}

interface IDispatchMap {
  getRestaurants: typeof getRestaurants;
}

type IRestaurantsProps = IStateMap & IDispatchMap & RouteComponentProps;

interface IRestaurantsState {
  filter: string;
  openSelect: TSelect;
  restaurants: IRestaurant[];
  sort: string;
}

const SORT_KEYS = [
  {
    label: 'Name',
    value: 'general.name',
  },
  {
    label: 'Rating',
    value: 'rating.average',
  },
  {
    label: 'City',
    value: 'address.city',
  },
  {
    label: 'Categories',
    value: 'general.categories',
  },
];

class Restaurants extends React.Component<IRestaurantsProps, IRestaurantsState> {
  constructor(props: IRestaurantsProps) {
    super(props);
    this.state = this.setInitialState();
  }

  public componentDidMount() {
    this.props.getRestaurants();
  }

  public componentDidUpdate(prevProps: IRestaurantsProps) {
    let restaurants = filterRestaurants(this.props.restaurants, this.state.filter);
    restaurants = sortRestaurants(restaurants, this.state.sort);
    if (this.props.restaurants !== prevProps.restaurants) {
      this.setState({ restaurants });
    }
  }

  public setInitialState = () => {
    const {restaurants: propsRestaurants} = this.props;
    const url = window.location.href;
    const params = parseUrl(url).query;
    const filter: string = params.filter as string || '';
    const sort: string = params.sort as string || '';
    const openSelect: TSelect = '';
    let restaurants = propsRestaurants ? filterRestaurants(propsRestaurants, filter) : [];
    restaurants = sortRestaurants(restaurants, sort);
    const initialState = {
      filter,
      openSelect,
      restaurants,
      sort,
    };
    return initialState;
  };

  public handleChangeFilter = (event: any) => {
    const { value } = event.target;
    const { location, history } = this.props;
    let restaurants = filterRestaurants(this.props.restaurants, value);
    restaurants = sortRestaurants(restaurants, this.state.sort);
    const params = parseUrl(location.search).query;
    // if (value) {
    //   params.filter = value;
    // } else {
    //   delete params.filter;
    // }
    const search = value ? stringify(params) : '';
    history.push({
      pathname: location.pathname,
      search,
    });
    this.setState({
      filter: value,
      restaurants,
    });
  };

  public handleChangeSort = (event: any) => {
    const { value } = event.target;
    const restaurants = sortRestaurants(this.state.restaurants, value);
    this.setState({
      restaurants,
      sort: value,
    });
  };

  public render() {
    const { restaurants } = this.state;
    const { loading } = this.props;

    return (
      <Main>
        {loading[GET_RESTAURANTS] ? (
          <div className="reactLoadingWrapper">
            <ReactLoading type="spin" color={scssVars.lightGray} className="reactLoading" />
          </div>
        ) : (
          <div className="Restaurants">
            <div className="restaurantsContainer">
              {restaurants.map((restaurant: IRestaurant, ind: number) => {
                const key = `${restaurant.id}-${ind}`;
                return <RestaurantRow key={key} restaurant={restaurant} />;
              })}
            </div>
            <div className="filterSortSection">
              <TextField
                label="Filter"
                type="search"
                className="textField"
                margin="normal"
                variant="outlined"
                value={this.state.filter}
                onChange={this.handleChangeFilter}
              />
              <TextField
                select={true}
                label="Sort"
                className="textField"
                value={this.state.sort}
                onChange={this.handleChangeSort}
                margin="normal"
                variant="outlined"
              >
                {SORT_KEYS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        )}
      </Main>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  loading: state.common.loading,
  restaurants: state.restaurants.data,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getRestaurants,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Restaurants);
