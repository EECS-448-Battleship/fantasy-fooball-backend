import { expect } from 'chai'
import sinon from 'sinon'
import {router} from '../../frontend/src/module/routing'

// Since we're testing code meant for the browser, not node, mock this
global.window = global

describe('the html5 history router', function() {
    it('should be a functional class', function() {
        expect(router).to.exist
    })

    it('should use the global base path', function() {
        global.APP_BASE_PATH = 'testing-1-2-3'
        expect(router.base_path).to.be.equal('testing-1-2-3')
    })

    it('should navigate using the History API', function() {
        const args = { test: 123 }

        // mock this history API
        global.history = {
            pushState: sinon.spy()
        }

        router.navigate('some-path', args)
        expect(global.history.pushState.calledOnce).to.be.true
        expect(global.history.pushState.getCall(0).args[1]).to.be.equal('some-path')
        expect(router.route_args).to.be.equal(args)
    })

    it('should call subscribers on navigate', function() {
        const handler = sinon.spy()
        const args = { test: 123 }

        router.subscribe(handler)
        router.navigate('some-other-path', args)

        expect(handler.calledOnce).to.be.true
        expect(handler.getCall(0).args[0]).to.be.equal('some-other-path')
        expect(handler.getCall(0).args[1]).to.be.equal(args)
    })
})
