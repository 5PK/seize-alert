/**
 * Defines a sequelized seizure data.
 * @param {any} sequelize Sequelized Seizure data
 * @param {any} DataTypes Defined data types for seizure data.
 * @returns a defined sequelized seizure data.
 */
const data = (sequelize, DataTypes) => {
  // Define sequelized seizure data.
  const Data = sequelize.define('data', {
    limb: DataTypes.STRING,
    x: DataTypes.FLOAT,
    y: DataTypes.FLOAT,
    z: DataTypes.FLOAT,
    timestamp: DataTypes.STRING,
    isSeizure: DataTypes.BOOLEAN
  }, {
    timestamps: false
  });

  return Data;
};

export default data;
