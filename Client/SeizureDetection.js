import { round, variance, norm } from 'mathjs';

export default class SeizureDetection {

    constructor() {
    }

    /**
     * Computes vectors of seizure detected data from the right arm or ankle of a user.
     * @param {array} arrayValue an array of seizure detected data from the right arm or the ankle of a user.
     * @returns a vector array that has calculated vector values from the seizure detected data.
     */
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

        //console.log("variance: {0}".format(round(np.var(arrayValue),3)))
       // console.log(arrayValue)
        return round(variance(arrayValue), 3);
    }

    determine(rightArm, rightAnkle) {

        var WINDOW_SIZE = rightArm.length;

        /* if (this.NUM_OF_DATA < this.WINDOW_SIZE){
            this.NUM_OF_DATA += 1;
            console.log("initialize detection algorithm...");
            return false;

        } */

        // console.log(rightArm[0])
        // var mergedArrayRightArm = [];

        // for (i = 0; i < WINDOW_SIZE; i++){
        //     mergedArrayRightArm.push([rightArm[i], rightArm[i], rightArm[i]]);
        // }

        //   console.log(mergedArrayRightArm)

        // var mergedArrayRightAnkle = [];
        // for (i = 0; i < WINDOW_SIZE; i++){
        //     mergedArrayRightAnkle.push([rightAnkle[i], rightAnkle[i], rightAnkle[i]]);        
        // }

        var vectorArrayRightArm = this.calculateVector(rightArm);

        var vectorArrayRightAnkle = this.calculateVector(rightAnkle);

        // Average
        var vectorRightArm = this.calculateAverage(vectorArrayRightArm);
        var vectorRightAnkle = this.calculateAverage(vectorArrayRightAnkle);

        // Variance
        var varianceRightArm = this.calculateVariance(vectorArrayRightArm);
        var varianceRightAnkle = this.calculateVariance(vectorArrayRightAnkle);


        // console.log("analyzing data ...");

        // console.log(varianceRightArm);

        // console.log(varianceRightAnkle);
        // console.log(vectorRightArm);
        //console.log("HR:{0:3d},  varianceRightArm:{1:5.3f},  varianceRightAnkle:{2:5.3f}, vector:{3:5.3f}, vector:{4:5.3f}".format(sensorData[CHEST][HR][-1], varianceRightArm, varianceRightAnkle, vectorRightArm, vectorRightAnkle))

        if (varianceRightArm >= .001 && varianceRightAnkle >= .001 && vectorRightArm >= .8 && vectorRightAnkle >= .8) {

            return true;
        } else {

            return false;

        }

    }

}
