import { round, variance, norm } from 'mathjs';

export default class SeizureDetection {

    constructor() {
    }

    calculateVector(arrayValue) {
        vectorArray = [];
        arrayValue.forEach(element => {
            tempArray = [element[0], element[1], element[2]];
            vectorArray.push(norm(tempArray));
        });

        return vectorArray;
    }

    calculateAverage(arrayValue) {
        total = 0.0;

        arrayValue.forEach(element => {
            total += element;
        });

        avg = total / arrayValue.length;

        return round(avg, 3);
    }

    calculateVariance(arrayValue) {

        return round(variance(arrayValue), 3);
    }

    determine(rightArm, rightAnkle) {

        var vectorArrayRightArm = this.calculateVector(rightArm);
        var vectorArrayRightAnkle = this.calculateVector(rightAnkle);
        var vectorRightArm = this.calculateAverage(vectorArrayRightArm);
        console.log('vectorRightArm', vectorRightArm)
        var vectorRightAnkle = this.calculateAverage(vectorArrayRightAnkle);
        console.log('vectorRightAnkle', vectorRightAnkle)
        var varianceRightArm = this.calculateVariance(vectorArrayRightArm);
        console.log('varianceRightArm', varianceRightArm)
        var varianceRightAnkle = this.calculateVariance(vectorArrayRightAnkle);
        console.log('varianceRightAnkle', varianceRightAnkle)

        if (varianceRightArm >= .001 && varianceRightAnkle >= .001 && vectorRightArm >= .8 && vectorRightAnkle >= .8) {

            return true;
        } else {

            return false;

        }

    }

}
