
class SeizureDetection {
    constructor() {

    }
    calculateVector(arrayValue) {
        vectorArray = [];
        arrayValue.forEach(element => {
            tempArray = array([val[X], val[Y], val[Z]]);
            vectorArray.append(norm(tempArray));
        });
        return vectorArray;
    }

    calculateAverage(arrayValue){
        total = 0.0;

        arrayValue.forEach(element =>{
            total += val;
            avg = total / len(arrayValue);

        });
            
        //console.log("AVG: {0}".format(avg));
        return round(avg, 3);
    }

    calculateVariance(arrayValue){

        //console.log("variance: {0}".format(round(np.var(arrayValue),3)))

        return round(math.var(arrayValue), 3);
    }
    
    determine(slidingWindow){
        sensorData = slidingWindow.getAllData();
        this.WINDOW_SIZE = sensorData[CHEST][HR].length;
        if (NUM_OF_DATA < this.WINDOW_SIZE){
            self.NUM_OF_DATA += 1;
            print("initialize detection algorithm...");
            return false;

        }

        var mergedArrayRightArm = [];
        for (i = 0; i < self.WINDOW_SIZE; i++){
            mergedArrayRightArm.push([sensorData[RIGHTARM][ACCL][X][i], sensorData[RIGHTARM][ACCL][Y][i], sensorData[RIGHTARM][ACCL][Z][i]]);
        }

        var mergedArrayRightAnkle = [];
        for (i = 0; i < self.WINDOW_SIZE; i++){
            mergedArrayRightAnkle.push([sensorData[RIGHTANKLE][ACCL][X][i], sensorData[RIGHTANKLE][ACCL][Y][i], sensorData[RIGHTANKLE][ACCL][Z][i]]);
        }  

        var vectorArrayRightArm = this.calculateVector2(mergedArrayRightArm);        
        var vectorArrayRightAnkle = this.calculateVector2(mergedArrayRightAnkle);

        var vectorRightArm = this.calculateAverage(vectorArrayRightArm);
        var vectorRightAnkle = this.calculateAverage(vectorArrayRightAnkle);      

        var varianceRightArm = this.calculateVariance(vectorArrayRightArm);
        var varianceRightAnkle = this.calculateVariance(vectorArrayRightAnkle);

        console.log("analyzing data ...")
        console.log("HR:{0:3d},  varianceRightArm:{1:5.3f},  varianceRightAnkle:{2:5.3f}, vector:{3:5.3f}, vector:{4:5.3f}".format(sensorData[CHEST][HR][-1], varianceRightArm, varianceRightAnkle, vectorRightArm, vectorRightAnkle))
        
        if(sensorData[CHEST][HR][-1] > 100 && varianceRightArm >= self.THRESHOLD_RIGHTARM && varianceRightAnkle >= self.THRESHOLD_RIGHTANKLE && vectorRightArm >= 2.0 && vectorRightAnkle >=2.0 ){
            return true;
        }else{
            console.log("............");
            return false;

        }
            
    }

}