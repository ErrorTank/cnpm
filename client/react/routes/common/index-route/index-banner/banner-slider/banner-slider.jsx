import React from "react";
import {Slider} from "../../../../../common/slider/slider";
import debounce from "lodash/debounce"
import {SliderClickControl} from "./slider-click-control/slider-click-control";

export class BannerSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0
        };
        this.interval = null;

    };

    componentDidMount() {
        this.runSliderInterval();
    }

    runSliderInterval = () => {
        this.interval = setInterval(() => {
            let {current} = this.state;
            if(current === this.bannerImages.length - 1){
                this.setState({current: 0});
            }else{
                this.setState({current: current + 1});
            }
        }, 3000);
    };

    bannerImages = [
        {
            content: (
                <div className="banner-slider-content first">
                    <img src="/assets/img/s8.png" id="banner-s8"/>
                    <img src="/assets/img/s10.png" id="banner-s10"/>
                    <img src="/assets/img/iphone-x.png" id="banner-ipx"/>
                    <div className="description">
                        <div className="slider-title">
                            SẮM SMARTPHONE
                        </div>
                        <br/>
                        <p className="slider-quote">VUI CHƠI <br/> THẢ GA</p>
                        <br/>
                        <p className="slider-sub">Giá sốc - Deal chất</p>
                        <br/>
                        <div className='navigate'>
                            Xem ngay
                        </div>
                    </div>
                </div>
            )
        }, {
            content: (
                <div className="banner-slider-content sec">
                    <img src="/assets/img/case.png" id="banner-case"/>
                    <img src="/assets/img/scar2.png" id="banner-scar2"/>
                    <img src="/assets/img/rtx-2080.png" id="banner-2080"/>
                    <div className="description">
                        <div className="slider-title">
                            BUILD PC - LAPTOP GAMING
                        </div>
                        <br/>
                        <p className="slider-quote">LINH KIỆN <br/> CHÍNH HÃNG</p>
                        <br/>
                        <p className="slider-sub">Chiến đấu thỏa thích</p>
                        <br/>
                        <div className='navigate'>
                            Tìm hiểu
                        </div>
                    </div>
                </div>
            )
        }, {
            content: (
                <div className="banner-slider-content third">
                    <img src="/assets/img/lg-fridge.png" id="fridge-banner"/>
                    <img src="/assets/img/sony-4k.png" id="sony-banner"/>
                    <img src="/assets/img/lg-mg.png" id="mg-banner"/>
                    <div className="description">
                        <div className="slider-title">
                            MUA SẮM ĐIỆN MÁY
                        </div>
                        <br/>
                        <p className="slider-quote">ĐIỆN MÁY <br/> CHÍNH HÃNG</p>
                        <br/>
                        <p className="slider-sub">Hàng ngàn quà tặng</p>
                        <br/>
                        <div className='navigate'>
                            Sắm ngay
                        </div>
                    </div>
                </div>
            )
        }
    ];

    handleFocusOnSlide = () => {
      if(this.interval) clearInterval(this.interval);
    };


    render() {
        let {current} = this.state;
        return (
            <div className="banner-slider"
                 onMouseOver={this.handleFocusOnSlide}
                 onMouseLeave={this.runSliderInterval}
            >
                <Slider
                    current={current}
                    getContent={index => this.bannerImages[index].content}

                />
                <SliderClickControl
                    onClick={index => this.setState({current: index})}
                    length={3}
                    current={current}
                />
                <div className="slider-control left"
                     onClick={() => {
                         if (current === 0) {
                             this.setState({current: this.bannerImages.length - 1})
                         } else {
                             this.setState({current: current - 1})
                         }
                     }}
                >
                    <div className="wrapper">
                        <i className="fas fa-chevron-left"></i>
                    </div>

                </div>
                <div className="slider-control right"
                     onClick={() => {
                         if (current === this.bannerImages.length - 1) {
                             this.setState({current: 0})
                         } else {
                             this.setState({current: current + 1})
                         }
                     }}
                >
                    <div className="wrapper">
                        <i className="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        );
    }
}