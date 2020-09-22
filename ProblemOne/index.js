var arr = [
  {
    'guest_type': 'crew',
    'first_name': 'Marco',
    'last_name': 'Burns',
    'guest_booking': {
        'room_no': 'A0073',
        'some_array': [7,2,4]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'John',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Jane',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Albert',
    'last_name': 'Einstein',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'crew',
    'first_name': 'Jack',
    'last_name': 'Daniels',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Alan',
    'last_name': 'Turing',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
];

function mutateArray(a) {
    filtered = a.filter(val=> val.guest_type === 'guest');
    output = filtered.map(guest=>{
        guestOutput = flattenObject({...guest});
        guestOutput.some_total = guestOutput.some_array?.reduce((acc, val)=> acc+val);
        delete guestOutput.some_array;
        return guestOutput;
    });
    output.sort((a,b)=> (a.last_name+a.first_name).localeCompare(b.last_name+b.first_name))
    return output;
}

function flattenObject(obj){
    return Object.fromEntries(getEntries(obj));
}

function getEntries(obj){
    return Object.entries(obj).flatMap(([key, value]) => 
    //If value is an object but not an array, recurse to get its entries
    (typeof value === 'object' && !Array.isArray(value))  ? getEntries(value) : [[ key,value ]]
  );
}

$(document).ready(function() {
    $('#originalArray').html(JSON.stringify(arr, null, 2));
    $('#resultsArray').html(JSON.stringify(mutateArray(arr), null, 2));
});
