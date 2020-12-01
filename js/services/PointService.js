import {LocalStorageService} from './LocalStorageService.js';

export class PointService {
    points = [];

    /**
     * コンストラクタ
     */
    constructor() {
        this.localStorageService = new LocalStorageService();
        this.initPoints();
    }

    initPoints() {
        const points = this.localStorageService.retrieve('points');
        if (!points) {
            this.localStorageService.store('points', this.points);
        }
        this.points = points;
    }

    getPoints() {
        return this.points;
    }

    addPoint(name) {
        const point = {
            name: name
        };
        this.points.push(point);
        this.localStorageService.store('points', this.points);
    }
}
