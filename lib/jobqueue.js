(function( exports ) {

var util = require( 'util' ),
    EventEmitter = require( 'events' ).EventEmitter;

function Job( func ) {
  this.func = func;
}

function JobQueue() {
  this.queue = [];
  this.running = false;
  this.currentJob = null;
}

util.inherits( JobQueue, EventEmitter );

JobQueue.prototype = {

  add: function( job ) {
    if ( typeof job == 'function' ) {
      job = new Job( job );
    }

    this.queue.push( job );
  },

  start: function() {
    this.running = true;
    if ( !this.inLoop ) {
      this._loop();
    }
  },

  stop: function() {
    this.running = false;
  },

  _completedTask: function() {
    this.currentJob = null;
  },

  _loop: function() {
    if ( !this.running ) return;

    process.nextTick( this._loop.bind( this ) );

    this.inLoop = true;

    if ( this.currentJob === null ) {
      this.currentJob = this.queue.shift();

      if ( this.currentJob != null ) {
        this.currentJob.func( this._completedTask.bind( this ) );
      }
    }

    this.inLoop = false;
  }

};

exports.jobQueue = function() {
  return new JobQueue();
};

exports.job = function( func ) {
  return new Job( func );
};

})( module.exports );
