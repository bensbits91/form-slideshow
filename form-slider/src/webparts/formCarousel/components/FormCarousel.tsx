import * as React from 'react';
import styles from './FormCarousel.module.scss';
import { IFormCarouselProps } from './IFormCarouselProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import Slider from './Slider';
import { colors } from './definitions';
import './temp.css';

export default class FormCarousel extends React.Component<IFormCarouselProps, {}> {
  public render(): React.ReactElement<IFormCarouselProps> {
    return (
      <Slider
        web='https://ntandem.sharepoint.com/sites/DemoDataSource01'
        list='CI Requests'
        isAdmin={false}
        theme={{
          color_1: colors.mint,
          color_2: colors.navy,
          color_3: colors.yellow
        }}
      />
      // <>asdf</>
    );
  }
}
