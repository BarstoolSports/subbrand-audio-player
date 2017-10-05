'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var videojs = _interopDefault(require('video.js'));

var version = "0.0.0";

// Default options for the plugin.
var defaults = {};

// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
var onPlayerReady = function onPlayerReady(player, options) {
  player.addClass('vjs-audio-player');
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function audioPlayer
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */

var Component = videojs.getComponent('Component');
var AudioPlayer = videojs.extend(Component, {});
var PlayerDash = videojs.extend(Component, {});
var TimeDisplay = videojs.extend(Component, {});

videojs.registerComponent('AudioPlayer', AudioPlayer);
videojs.registerComponent('PlayerDash', PlayerDash);
videojs.registerComponent('TimeDisplay', TimeDisplay);

var audioPlayer = function audioPlayer(options) {
  var _this = this;

  this.ready(function () {
    _this.removeChild('PosterImage');
    _this.removeChild('TextTrackDisplay');
    _this.removeChild('BigPlayButton');
    _this.removeChild('ControlBar');
    onPlayerReady(_this, videojs.mergeOptions(defaults, options));
  });

  var _audioPlayer = this.addChild('AudioPlayer');
  _audioPlayer.addClass('vjs-ap-container');
  var _playerDash = _audioPlayer.addChild('PlayerDash');
  _playerDash.addClass('vjs-ap-dash');
  var _controlBar = _playerDash.addChild('ControlBar');
  _controlBar.addClass('vjs-ap-control-bar');
  _controlBar.removeChild('FullscreenToggle');
  _controlBar.removeChild('RemainingTimeDisplay');
  // time display
  var _timeDisplay = _controlBar.addChild('TimeDisplay');
  _timeDisplay.addClass('vjs-ap-time-display');
  _timeDisplay.addChild('CurrentTimeDisplay');
  _timeDisplay.addChild('TimeDivider');
  _timeDisplay.addChild('DurationDisplay');
};

// Register the plugin with video.js.
registerPlugin('audioPlayer', audioPlayer);

// Include the version number.
audioPlayer.VERSION = version;

module.exports = audioPlayer;
