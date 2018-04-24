const { Controller } = require('bak');
const Joi = require('joi');
const axios = require('axios');
const hello = require('../lib/hello');

class BaseController extends Controller {
  init() {
    this.defaults = {
      tags: ['api'],
    };

    this.get('/start', this.start, {
      description: 'Start a new Session',
    });

    this.get('/support', this.support, {
      description: 'Get current support user profile data',
    });

    this.post('/send', this.send, {
      description: 'Send a message to the support',
      validate: {
        payload: {
          message: Joi.string()
            .required()
            .min(1),
        },
      },
    });

    this.get('/fetch', this.fetch, {
      description: 'Fetch all new messages',
    });
  }

  async start(request) {
    request.yar.reset();
    return { success: true };
  }

  async ensureSession(request) {
    if (!request.yar.get('started')) {
      const support = await axios
        .get('https://randomuser.me/api/')
        .then(r => r.data.results[0])
        .then(user => ({
          first: user.name.first,
          last: user.name.last,
          picture: user.picture.medium,
        }));

      request.yar.set('support', support);
      //   request.yar.set('messages', []);
      request.yar.set('responses', []);
      request.yar.set('started', true);

      await this.addResponse(request, hello());
    }
  }

  async addResponse(request, message) {
    request.yar.get('responses').push({
      message,
      date: Date.now(),
    });
  }

  async support(request) {
    await this.ensureSession(request);

    const support = request.yar.get('support');

    return {
      support,
    };
  }

  async send(request) {
    await this.ensureSession(request);

    const { message } = request.payload;

    // EchoBack!
    await this.addResponse(request, message);

    return {
      success: true,
    };
  }

  async fetch(request) {
    await this.ensureSession(request);

    const responses = request.yar.get('responses');

    request.yar.set('responses', []);

    return {
      responses,
    };
  }
}

module.exports = BaseController;
