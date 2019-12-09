import { round, variance, norm } from 'mathjs';

/**
 * Seizure detection calculations from the sensor tag.
 */
export default class SeizureDetection {
    
    // Empty constructor
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

    /**
     * Calculate average of the detected seizure data. 
     * @param {any} arrayValue detected Seizure data
     * @returns average of the seizure data.
     */
    calculateAverage(arrayValue) {
        total = 0.0;

        arrayValue.forEach(element => {
            total += element;
        });

        avg = total / arrayValue.length;

        return round(avg, 3);
    }

    /**
     * Calculates variance from the seizure data and returns the calculations in variance.
     * @param {any} arrayValue detected seizure data.
     * @returns variance of the detected seizure data.
     */
    calculateVariance(arrayValue) {

        //console.log("variance: {0}".format(round(np.var(arrayValue),3)))
       // console.log(arrayValue)
        return round(variance(arrayValue), 3);
    }

    /**
     * Determine whether if seizure was detected or not based of the arm and ankle data.
     * @param {any} rightArm Data from the right arm.
     * @param {any} rightAnkle Data from the ankle arm.
     * @returns 
     * True: seizure was detected.
     * False: Seizure was not detected.
     */
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

        // Calculations
        var vectorArrayRightArm = this.calculateVector(rightArm);
        var vectorArrayRightAnkle = this.calculateVector(rightAnkle);

        // Average
        var vectorRightArm = this.calculateAverage(vectorArrayRightArm);
        var vectorRightAnkle = this.calculateAverage(vectorArrayRightAnkle);

        // Variance
        var varianceRightArm = this.calculateVariance(vectorArrayRightArm);
        var varianceRightAnkle = this.calculateVariance(vectorArrayRightAnkle);

        // Debugging purposes for displaying calculated data.
        // console.log("analyzing data ...");

        // console.log(varianceRightArm);

        // console.log(varianceRightAnkle);
        // console.log(vectorRightArm);
        //console.log("HR:{0:3d},  varianceRightArm:{1:5.3f},  varianceRightAnkle:{2:5.3f}, vector:{3:5.3f}, vector:{4:5.3f}".format(sensorData[CHEST][HR][-1], varianceRightArm, varianceRightAnkle, vectorRightArm, vectorRightAnkle))

        // Check the variance and vector data detect seizures.
        if (varianceRightArm >= .001 && varianceRightAnkle >= .001 && vectorRightArm >= .8 && vectorRightAnkle >= .8) {
            return true;
        } else {

            return false;

        }

    }

}
