import * as React from 'react';
import {
  card,
  getDropShadow,
  getExternalLinkStyles,
  getShadows,
} from '../../styles/commonStyles';
import star from '../../assets/img/star.png';
import main from '../../assets/img/main.png';
import { FontIcon, getTheme, Stack, Text } from '@fluentui/react';
import './index.scss';
import { tabs } from '../../utils';
import { IAbout, ICommon } from '../../model';
import about from '../../data/about.json';
import common from '../../data/common.json';
import { TextRenderer } from '..';

interface IProfileCardProps {
  onTabChange?: (currentTab: string) => void;
  hideFooter?: boolean;
}

export class ProfileCard extends React.Component<IProfileCardProps> {
  about: IAbout;
  common: ICommon;
  constructor(props: {}) {
    super(props);
    this.about = about;
    this.common = common;
  }

  setShadowPreference = () => {
    if (localStorage.getItem('hideShadows') === 'true')
      localStorage.setItem('hideShadows', 'false');
    else localStorage.setItem('hideShadows', 'true');
    window.location.reload();
  };

  openBlog = () => {
    window.open(about.blog, '_blank');
  };

  render(): JSX.Element {
    const theme = getTheme();

    return (
      <div
        className={`${card} card ${getShadows(
          theme
        )} profile ${getExternalLinkStyles(theme)}`}
      >
        <div className={`image-container ${getShadows(theme)}`}>
          <img
            className={`${getDropShadow(theme)} ${
              !this.props.hideFooter ? 'short' : 'detailed'
            }`}
            height="100px"
            src={this.props.hideFooter ? star : main}
            alt="me"
          />
        </div>
        {this.props.hideFooter && (
          <>
            <span className="m-l-2">
              {<TextRenderer data={this.about.about[0]}></TextRenderer>}
            </span>
            <p>
              <TextRenderer data={this.about.about[1]}></TextRenderer>
            </p>
            <p>
              <TextRenderer data={this.about.about[2]}></TextRenderer>
            </p>
            <p>
              <TextRenderer data={this.about.about[3]}></TextRenderer>
            </p>
          </>
        )}
        {!this.props.hideFooter && (
          <>
            <div className="custom-button-container plutonic">
              <span
                className="custom-button"
                onClick={() => {
                  this.setShadowPreference();
                }}
              >
                <FontIcon
                  className="custom-button-icon"
                  aria-label="Personalize"
                  iconName="EyeShadow"
                />
                <span>
                  {localStorage.getItem('hideShadows') !== 'true'
                    ? 'No shadows please!'
                    : 'Bring in some shadows!'}
                </span>
              </span>
            </div>
            <Text className="m-l-2">
              <TextRenderer data={this.about.aboutSummary[0]}></TextRenderer>
            </Text>
            <Text className="name">{this.about.maidenName}</Text>
            <Text>
              <TextRenderer data={this.about.aboutSummary[1]}></TextRenderer>
            </Text>
            <Stack>
              <Stack.Item grow> </Stack.Item>
              <Stack horizontal className="custom-button-container m-t-3">
                <Stack.Item>
                  <span
                    className={`${getShadows(
                      theme
                    )} custom-button active-button`}
                    onClick={() => this.openBlog()}
                  >
                    {this.common.readTheBlog}
                    <FontIcon
                      className="m-l-1"
                      aria-label="Blog"
                      iconName="News"
                    />
                  </span>
                </Stack.Item>
                <Stack.Item grow> </Stack.Item>
                <Stack.Item>
                  <span
                    className={`${getShadows(
                      theme
                    )} custom-button active-button`}
                    onClick={() => {
                      this.props.onTabChange?.(tabs[2]);
                    }}
                  >
                    <FontIcon
                      aria-label="Work"
                      iconName="Work"
                      className="custom-button-icon"
                    />
                    {this.common.seeMyWork}
                  </span>
                </Stack.Item>
              </Stack>
            </Stack>
          </>
        )}
      </div>
    );
  }
}
