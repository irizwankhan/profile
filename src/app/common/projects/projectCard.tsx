import { FontIcon, ITheme, Stack, Text, getTheme } from '@fluentui/react';
import { Component } from 'react';
import { card, getShadows } from '../../styles/commonStyles';
import { getImageContainerStyles } from './styles';
import './styles.scss';
import { IProjectDetails } from '../../model';

export interface IProjectCardProps {
  theme: ITheme;
  data: IProjectDetails;
  onQuickView(projectDetail: IProjectDetails): void;
}

export class ProjectCard extends Component<IProjectCardProps> {
  render(): JSX.Element {
    const theme = getTheme();
    const data = this.props.data as IProjectDetails;

    return (
      <div
        className={`${card} card ${getShadows(theme)} projectCard p-5px a-d${
          Math.floor(Math.random() * 4) + 1
        }`}
      >
        <div
          className={`${getImageContainerStyles(data.img)} image-container`}
        ></div>
        <div
          className={`heading m-t-3 ${theme.isInverted ? 'isInverted' : ''}`}
          title={data.heading}
          onClick={() => {
            window.open(data.link);
          }}
        >
          <Text variant="mediumPlus">
            <strong>{data.heading}</strong>
          </Text>
        </div>
        <div className="description">
          <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
        </div>
        <Stack horizontal className="custom-button-container">
          <Stack.Item grow> </Stack.Item>
          <Stack.Item className="p-1">
            <span
              className={`${getShadows(theme)} custom-button active-button`}
              onClick={() => this.props.onQuickView(data)}
            >
              <FontIcon
                className="custom-button-icon"
                aria-label="Learn more"
                iconName="RedEye"
              />
              {'Learn more'}
            </span>
          </Stack.Item>
        </Stack>
      </div>
    );
  }
}
