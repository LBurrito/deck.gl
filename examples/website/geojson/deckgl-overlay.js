import React, {Component} from 'react';
import DeckGL, {GeoJsonLayer} from 'deck.gl';

// Source data GeoJSON
const DATA_URL =
  'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json'; // eslint-disable-line

const LIGHT_SETTINGS = {
  lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
  numberOfLights: 2
};

export default class DeckGLOverlay extends Component {
  static get defaultViewport() {
    return {
      latitude: 49.254,
      longitude: -123.13,
      zoom: 11,
      maxZoom: 16,
      pitch: 45,
      bearing: 0
    };
  }

  render() {
    const {viewport, colorScale} = this.props;

    const layer = new GeoJsonLayer({
      id: 'geojson',
      data: DATA_URL,
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      fp64: true,
      getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      getFillColor: f => colorScale(f.properties.growth),
      getLineColor: f => [255, 255, 255],
      lightSettings: LIGHT_SETTINGS,
      pickable: Boolean(this.props.onHover),
      onHover: this.props.onHover
    });

    return <DeckGL {...viewport} layers={[layer]} />;
  }
}
