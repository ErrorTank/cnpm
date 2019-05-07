import React from "react";
import {ImagesPicker} from "./images-picker/images-picker";
import {ImageDisplay} from "./image-display/image-display";

export class ProductImagesDisplay extends React.Component{
    constructor(props){
        super(props);
        this.state={
          current: props.images[0]
        };
    };
    render(){
        let {images} = this.props;
        let {current} = this.state;
        return(
            <div className="product-images-display">
              <ImagesPicker
                images={images}
                current={current}
                onPick={newImg => this.setState({current: newImg})}
              />
              <ImageDisplay/>
            </div>
        );
    }
}