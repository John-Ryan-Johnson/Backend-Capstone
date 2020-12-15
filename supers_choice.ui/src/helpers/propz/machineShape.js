/* eslint-disable import/no-anonymous-default-export */
import PropTypes from 'prop-types';

const machineShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  employeeId: PropTypes.number.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  isRunning: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  downtimeCodeId: PropTypes.number.isRequired,
  machineDetailId: PropTypes.number.isRequired,
});

export default { machineShape };
