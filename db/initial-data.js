const users = [
    { username: 'jahid101', password: 'pineapple' },
    { username: 'nathan101', password: 'pizza' }
];

const workouts = [
    { title: 'Morning Routine', summary: 'A quick morning workout to start the day', user_id: 1 },
    { title: 'Evening Strength', summary: 'Strength training exercises for the evening', user_id: 2 }
];

const exercises = [
    { title: 'Push-ups', reps: '3 sets of 15 reps', workout_id: 1 ,user_id: 1},
    { title: 'Squats', reps: '4 sets of 10 reps', workout_id: 1 ,user_id: 1},
    { title: 'Bench Press', reps: '3 sets of 12 reps', workout_id: 2,user_id: 2 },
    { title: 'Deadlift', reps: '4 sets of 8 reps', workout_id: 2 ,user_id: 2}
];


module.exports = {users,workouts,exercises}