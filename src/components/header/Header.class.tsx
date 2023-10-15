import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { withRouter, RouteComponentProps } from "../../helpers/withRouter";
import rootStore from "../../redux/store";
import { withTranslation, WithTranslation } from "react-i18next";
import {
  addLanguageActionCreator,
  changeLanguageActionCreator,
} from "../../redux/language/languageActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../redux/store";

const mapStateToProps = (state: RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: "zh" | "en") => {
      const action = changeLanguageActionCreator(code);
      dispatch(action);
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code);
      dispatch(action);
    },
  };
};

type PropsType = RouteComponentProps &
  WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class HeaderComponent extends React.Component<PropsType> {
  handleStoreChange = () => {
    const storeState = rootStore.store.getState();
    this.setState({
      language: storeState.language.language,
      languageList: storeState.language.languageList,
    });
  };

  menuClickHandler = (e) => {
    console.log(e);
    if (e.key === "new") {
      this.props.addLanguage("新语言", "new_lang");
    } else {
      this.props.changeLanguage(e.key);
    }
  };

  render(): React.ReactNode {
    const { navigate, t } = this.props;
    return (
      <div className={styles["app-header"]}>
        {/* top-header */}
        <div className={styles["top-header"]}>
          <div className={styles.inner}>
            <Typography.Text>{t("header.slogan")}</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu
                  onClick={this.menuClickHandler}
                  items={[
                    ...this.props.languageList.map((l) => {
                      return { key: l.code, label: l.name };
                    }),
                    { key: "new", label: t("header.add_new_language") },
                  ]}
                />
              }
              icon={<GlobalOutlined />}
            >
              {this.props.language === "zh" ? "中文" : "English"}
            </Dropdown.Button>
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => navigate("/register")}>
                {t("header.register")}
              </Button>
              <Button onClick={() => navigate("/signin")}>
                {t("header.signin")}
              </Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles["main-header"]}>
          <span onClick={() => navigate("/")}>
            <img src={logo} alt="logo" className={styles["App-logo"]} />
            <Typography.Title level={3} className={styles.title}>
              {t("header.title")}
            </Typography.Title>
          </span>
          <Input.Search
            placeholder={"Please input key words"}
            className={styles["search-input"]}
          />
        </Layout.Header>
      </div>
    );
  }
}

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(withRouter(HeaderComponent)));
