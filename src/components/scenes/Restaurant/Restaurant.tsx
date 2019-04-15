import { get } from 'lodash';
import * as React from 'react';
import ReactLoading from 'react-loading';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {GET_RESTAURANT, getRestaurant, IRestaurantAll, IRestaurantSection,} from 'store/restaurants';
import {IAppState} from 'store/store';
import {IBooleanObj} from 'types/IBaseEntities';
import RestaurantSection from './RestaurantSection';
import './styles.scss';

interface IStateMap {
  loading: IBooleanObj
  restaurant: Maybe<IRestaurantAll>
}

interface IDispatchMap {
  getRestaurant: typeof getRestaurant
}

type IRestaurantProps = IStateMap & IDispatchMap;

class Restaurant extends React.Component<IRestaurantProps> {
  public componentDidMount() {
    const pathname = get(this.props, 'location.pathname', null);
    if (pathname) {
      const arr = pathname.split('/');
      const id = arr[2];
      this.props.getRestaurant(id);
    }
  }

  public render() {
    const { loading, restaurant } = this.props;
    const logoUri = get(restaurant, 'info.logoUri', '');
    const name = get(restaurant, 'info.name', '');
    const averageRating = get(restaurant, 'rating.average', '');
    const city = get(restaurant, 'address.city', '');
    const streetName = get(restaurant, 'address.streetName', '');
    const streetNumber = get(restaurant, 'address.streetNumber', '');
    const location = `${streetNumber}, ${streetName}, ${city}`;
    const categories = get(restaurant, 'info.categories', []);
    const sections = restaurant ? restaurant.sections : [];
    return (
      <>
        {loading[GET_RESTAURANT] ? (
          <div className="reactLoadingWrapper">
            <ReactLoading type="spin" color="#777" className="reactLoading" />
          </div>
        ) : (
          <div className="Restaurant">
            <div className="restaurantRow">
              <div className="logo">
                <img className="flex" src={logoUri} alt="" />
              </div>
              <div className="restaurantInfoWrapper">
                <div className="nameRowWrapper">{`${name}  (${averageRating})`}</div>
                <div className="locationWrapper">{location}</div>
                <div className="categoryWrapper">
                  {categories.map((val: string) => (
                    <div key={val} className="category">
                      {val}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="restaurantSections">
              {sections.map((section: IRestaurantSection) => (
                <RestaurantSection key={section.id} section={section} />
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  loading: state.common.loading,
  restaurant: state.restaurants.restaurant,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getRestaurant,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Restaurant);
