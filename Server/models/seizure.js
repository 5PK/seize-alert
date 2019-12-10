/**
 * Defines a seizure data for a given user.
 * @param {any} sequelize Sequelized data.
 * @param {any} DataTypes Data type for the sequelized data.
 * @returns sequelized seizure data of a userid.
 */
const seizure = (sequelize, DataTypes) => {
  // Define sequelized seizure data.
    const Seizure = sequelize.define('seizure', {
      dateOccured: DataTypes.DATE,
    });
    return Seizure;
};

export default seizure;