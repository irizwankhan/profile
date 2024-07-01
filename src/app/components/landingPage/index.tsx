import * as React from 'react';
import { Header } from '../header';
import { About, All, Blog, Portfolio } from '../../sections';
import { getPathName, tabs, audioFiles } from '../../utils';

interface ILandingPageProps {
  onThemeChange: () => void;
}

interface ILandingPageState {
  selectedTab: string;
  currentPath: string;
  isPlaying: boolean;
  currentIndex: number;
}

export class LandingPage extends React.Component<
  ILandingPageProps,
  ILandingPageState
> {
  private audio: HTMLAudioElement;

  constructor(props: ILandingPageProps) {
    super(props);
    const currentLocation = getPathName() ? getPathName() : tabs[0];
    this.state = {
      selectedTab: currentLocation,
      currentPath: currentLocation,
      isPlaying: false,
      currentIndex: Math.floor(Math.random() * audioFiles.length),
    };
    this.audio = new Audio();
    this.audio.volume = 0.56; // Set the volume to 56%
    this.audio.addEventListener('ended', this.playNext);
  }

  componentDidMount() {
    this.audio.addEventListener('playing', this.handlePlaying);
    this.audio.addEventListener('pause', this.handlePause);
  }

  componentWillUnmount() {
    this.audio.removeEventListener('ended', this.playNext);
    this.audio.removeEventListener('playing', this.handlePlaying);
    this.audio.removeEventListener('pause', this.handlePause);
  }

  handlePlaying = () => {
    this.setState({ isPlaying: true }, this.updateWave);
  };

  handlePause = () => {
    this.setState({ isPlaying: false }, this.updateWave);
  };

  updateWave = () => {
    const waveLines = document.getElementsByClassName(
      'wave-line'
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < waveLines.length; i++) {
      if (this.state.isPlaying) {
        waveLines[i].style.animationPlayState = 'running';
        waveLines[i].style.webkitAnimationPlayState = 'running';
      } else {
        waveLines[i].style.animationPlayState = 'paused';
        waveLines[i].style.webkitAnimationPlayState = 'paused';
      }
    }
  };

  playNext = () => {
    const { currentIndex } = this.state;
    this.audio.src = `${process.env.PUBLIC_URL}/assets/audio/${audioFiles[currentIndex]}`;
    this.audio.play();
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex + 1) % audioFiles.length,
    }));
  };

  startPlayback = () => {
    if (this.state.isPlaying) {
      this.audio.pause();
    } else {
      if (this.audio.src) {
        this.audio.play();
      } else {
        this.playNext();
      }
    }
  };

  componentDidUpdate() {
    if (getPathName() !== this.state.currentPath) {
      const currentLocation = getPathName() ? getPathName() : tabs[0];
      this.setState({
        selectedTab: currentLocation,
        currentPath: currentLocation,
      });
    }
  }

  onTabChange = (currentTab: string): void => {
    if (this.state.selectedTab !== currentTab) {
      this.setState({ selectedTab: currentTab, currentPath: currentTab });
      window.history.pushState(null, '', `/${currentTab}`);
      window.history.replaceState(null, '', `/${currentTab}`);
    }
  };

  getSections = (currentTab: string): JSX.Element => {
    switch (currentTab) {
      case tabs[0]:
        return (
          <All
            onTabChange={this.onTabChange}
            onThemeChange={this.props.onThemeChange}
          />
        );
      case tabs[1]:
        return <About onThemeChange={this.props.onThemeChange} />;
      case tabs[2]:
        return <Portfolio />;
      case tabs[3]:
        return <Blog onThemeChange={this.props.onThemeChange} />;

      default:
        return <></>;
    }
  };

  render(): JSX.Element {
    return (
      <>
        <Header
          selectedKey={this.state.selectedTab}
          handleTabClick={this.onTabChange}
        />
        <div className="sections m-2 m-t-3">
          <span
            className={`wave-wrapper ${
              this.state.selectedTab !== tabs[3] ? '' : 'd-none'
            }`}
            id="waveWrapper"
            onClick={this.startPlayback}
          >
            <span className="wave-line"></span>
            <span className="wave-line"></span>
            <span className="wave-line"></span>
            <span className="wave-line"></span>
            <span className="wave-line"></span>
          </span>
          {this.getSections(this.state.selectedTab)}
        </div>
      </>
    );
  }
}
