import React from "react";
import {
  Carousel,
  ProductCollection,
} from "../../components";
import { Row, Col, Typography, Spin } from "antd";
import sideImage from "../../assets/images/carousel_1.jpg";
import sideImage2 from "../../assets/images/carousel_2.jpg";
import sideImage3 from "../../assets/images/carousel_3.jpg";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { giveMeDataActionCreator } from "../../redux/recommendProducts/recommendProductsActions";
import { MainLayout } from "../../layouts/mainLayout";

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    giveMeData: () => {
      dispatch(giveMeDataActionCreator());
    },
  };
};

type PropsType = WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends React.Component<PropsType> {
  componentDidMount() {
    this.props.giveMeData();
  }

  render(): React.ReactNode {
    const { t } = this.props;
    const { productList, loading, error } = this.props;
    if (loading) {
      return (
        <Spin
          size="large"
          style={{
            marginTop: 200,
            marginBottom: 200,
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
          }}
        />
      );
    }
    if (error) {
      return <div>Internal Error {error}</div>;
    }
    return (
      <MainLayout>
        <Row style={{ marginTop: 20 }}>
          <Col>
            <Carousel />
          </Col>
        </Row>
        <ProductCollection
          title={
            <Typography.Title level={3} type="warning">
              Recommandation for you
            </Typography.Title>
          }
          sideImage={sideImage}
          products={productList[0].touristRoutes}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="danger">
              Trending
            </Typography.Title>
          }
          sideImage={sideImage2}
          products={productList[1].touristRoutes}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="success">
              Near You
            </Typography.Title>
          }
          sideImage={sideImage3}
          products={productList[2].touristRoutes}
        />
      </MainLayout>
    );
  }
}

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(HomePageComponent));
