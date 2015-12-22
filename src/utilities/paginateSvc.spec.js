/* global describe */
/* global module */
/* global beforeEach */
/* global inject */
/* global it */
/* global expect */

describe('paginateSvc', function() {
    "use strict";

    var paginateSvc;

    beforeEach(module('flintAndSteel'));

    beforeEach(inject(function(_paginateSvc_) {
        paginateSvc = _paginateSvc_;
    }));

    var content;
    beforeEach(function() {
        content = [
            "Some Data",
            "More Data",
            3,
            {text: "Type of Data doesn't matter"},
            "At least it shouldn't",
            "I sure hope it works",
            "Or Lord Vader will not be pleased",
            42,
            "Alderaan, always remember.",
            10
        ];
    });

    it('should exist', function() {
        expect(paginateSvc).toBeDefined();
    });

    describe('createNumPages()', function() {
        var numPages;
        beforeEach(function() {
            numPages = 4;
        });

        it('should create the number of pages we ask for', function() {
            var pages = paginateSvc.createNumPages(content, numPages);

            expect(pages.length).toBe(numPages);
        });

        it('should create try to fit as many elements per page as it can', function() {
            var pages = paginateSvc.createNumPages(content, numPages);

            expect(pages[0].length).toBe(3);
            expect(pages[1].length).toBe(3);
            expect(pages[2].length).toBe(3);
            expect(pages[3].length).toBe(3);
        });

        it('should have unique starting indices', function() {
            var pages = paginateSvc.createNumPages(content, numPages);

            expect(pages[0].start).toBe(0);
            expect(pages[1].start).not.toBe(pages[0].start);
            expect(pages[1].start).toBe(3);
            expect(pages[2].start).not.toBe(pages[1].start);
            expect(pages[2].start).toBe(6);
            expect(pages[3].start).not.toBe(pages[2].start);
            expect(pages[3].start).toBe(9);
        });
    });

    describe('createPerPage()', function() {
        var numPerPage;
        beforeEach(function() {
            numPerPage = 3;
        });

        it('each created page should have at most the number of elements we ask for', function() {
            var pages = paginateSvc.createPerPage(content, numPerPage);

            expect(pages[0].length).toBe(numPerPage);
            expect(pages[1].length).toBe(numPerPage);
            expect(pages[2].length).toBe(numPerPage);
            expect(pages[3].length).toBe(numPerPage);
        });

        it('should only create as many pages as we need', function() {
            var pages = paginateSvc.createPerPage(content, numPerPage);

            expect(pages.length).toBe(Math.ceil(content.length / numPerPage));
        });

        it('should have unique starting indices', function() {
            var pages = paginateSvc.createPerPage(content, numPerPage);

            expect(pages[0].start).toBe(0);
            expect(pages[1].start).not.toBe(pages[0].start);
            expect(pages[1].start).toBe(3);
            expect(pages[2].start).not.toBe(pages[1].start);
            expect(pages[2].start).toBe(6);
            expect(pages[3].start).not.toBe(pages[2].start);
            expect(pages[3].start).toBe(9);
        });
    });

});
