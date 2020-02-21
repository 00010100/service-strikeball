module.exports = {
  title: 'string',
  status: {type: 'enum', values: ['pending', 'approved', 'declined'], optional: true},
  to: 'email',
  teamName: 'string',
  type: {type: 'enum', values: ['join', 'change', 'leave']}
}
