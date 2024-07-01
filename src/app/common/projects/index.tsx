import { getTheme, Panel, PanelType } from '@fluentui/react';
import * as React from 'react';
import { getPanelShadows } from '../../styles/commonStyles';
import { ProjectCard } from './projectCard';
import { IProjectDetails } from '../../model';

interface IProjectProps {
  projectDetails: IProjectDetails[];
}

interface IProjectsState {
  isPanelOpen: boolean;
  selectedProjectDetails: IProjectDetails;
}

export class Projects extends React.Component<IProjectProps, IProjectsState> {
  constructor(props: IProjectProps) {
    super(props);
    this.state = {
      isPanelOpen: false,
      selectedProjectDetails: this.props.projectDetails[0],
    };
  }

  handlePanelOpen = (projectDetail: IProjectDetails): void => {
    this.setState({
      isPanelOpen: !this.state.isPanelOpen,
      selectedProjectDetails: projectDetail,
    });
  };

  handlePanelClose = (): void => {
    this.setState({ isPanelOpen: !this.state.isPanelOpen });
  };

  render(): JSX.Element {
    const theme = getTheme();

    return (
      <div className="projects">
        <Panel
          isLightDismiss
          className={`${getPanelShadows(theme)} panel`}
          type={PanelType.medium}
          headerText={this.state.selectedProjectDetails?.heading}
          isOpen={this.state.isPanelOpen}
          closeButtonAriaLabel="Close"
          onDismiss={this.handlePanelClose}
        >
          <img
            alt={this.state.selectedProjectDetails?.heading}
            className="panel-image m-t-2"
            src={this.state.selectedProjectDetails?.img}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: this.state.selectedProjectDetails?.description,
            }}
          ></p>
        </Panel>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            {this.props.projectDetails.map((projectDetail, i) => {
              return (
                <div
                  className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 ms-xl4"
                  key={i}
                >
                  <ProjectCard
                    theme={theme}
                    data={{
                      img: projectDetail.img,
                      heading: projectDetail.heading,
                      description: projectDetail.description,
                      link: projectDetail.link,
                    }}
                    onQuickView={this.handlePanelOpen}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
