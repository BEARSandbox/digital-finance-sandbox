const dotenv = require('dotenv');
const AWS = require('aws-sdk');

dotenv.config();

AWS.config = {
  region: 'us-east-1',
  accessKeyId: process.env.AWS_MTURK_ACCESS_KEY,
  secretAccessKey: process.env.AWS_MTURK_SECRET_ACCESS_KEY,
  sslEnabled: 'true',
};

let endpoint;

if (process.env.NODE_ENV === 'development') {
  endpoint = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com';
} else {
  endpoint = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com';
  //   endpoint = 'https://mturk-requester.us-east-1.amazonaws.com';
}

let mturk = new AWS.MTurk({ endpoint: endpoint, apiVersion: '2017-01-17' });

// var params = {
//   AssignmentId: '3TXWC2NHN2J8NL9PE5XED40J8OR9S3' /* required */,
//   OverrideRejection: false,
//   RequesterFeedback: 'Thank you for taking part in this study!',
// };
// mturk.approveAssignment(params, function (err, data) {
//   if (err) console.log(err, err.stack);
//   // an error occurred
//   else console.log(data); // successful response
// });

// var params = {
//   AssignmentId: '3T111IHZ5HJWM69CZGX9NUVNMM89RF' /* required */,
// };
// mturk.getAssignment(params, function (err, data) {
//   if (err) console.log(err, err.stack);
//   // an error occurred
//   else console.log(data); // successful response
// });

// mturk.listHITs({}, function (err, data) {
//   if (err) console.log(err, err.stack);
//   // an error occurred
//   else {
//     console.log(data); // successful response
//     console.log(data.HITs.length);
//   }
// });

var params = {
  HITId: '3QX22DUVOQ90ZDBT771M4TVVBX1MV6' /* required */,
  AssignmentStatuses: ['Submitted'],
};
mturk.listAssignmentsForHIT(params, function (err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
});
