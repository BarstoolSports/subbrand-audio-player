import videojs from 'video.js'
import {version as VERSION} from '../package.json'

// Default options for the plugin.
const defaults = {}

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin
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
const onPlayerReady = (player, options) => {
  player.addClass('vjs-audio-player')
}

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

const Component = videojs.getComponent('Component')
const AudioPlayer = videojs.extend(Component, {})
const PlayerDash = videojs.extend(Component, {})
const TimeDisplay = videojs.extend(Component, {})

videojs.registerComponent('AudioPlayer', AudioPlayer)
videojs.registerComponent('PlayerDash', PlayerDash)
videojs.registerComponent('TimeDisplay', TimeDisplay)

const audioPlayer = function (options) {
  this.ready(() => {
    this.removeChild('PosterImage')
    this.removeChild('TextTrackDisplay')
    this.removeChild('BigPlayButton')
    this.removeChild('ControlBar')
    onPlayerReady(this, videojs.mergeOptions(defaults, options))
  })

  const _audioPlayer = this.addChild('AudioPlayer')
  _audioPlayer.addClass('vjs-ap-container')
  const _playerDash = _audioPlayer.addChild('PlayerDash')
  _playerDash.addClass('vjs-ap-dash')
  const _controlBar = _playerDash.addChild('ControlBar')
  _controlBar.addClass('vjs-ap-control-bar')
  _controlBar.removeChild('FullscreenToggle')
  _controlBar.removeChild('RemainingTimeDisplay')
  // time display
  const _timeDisplay = _controlBar.addChild('TimeDisplay')
  _timeDisplay.addClass('vjs-ap-time-display')
  _timeDisplay.addChild('CurrentTimeDisplay')
  _timeDisplay.addChild('TimeDivider')
  _timeDisplay.addChild('DurationDisplay')
}

// Register the plugin with video.js.
registerPlugin('audioPlayer', audioPlayer)

// Include the version number.
audioPlayer.VERSION = VERSION

export default audioPlayer
