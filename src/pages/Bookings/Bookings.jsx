import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import BookingRow from './BookingRow';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate()

    const url = `https://server-car-doctor-sanad-bhowmik.vercel.app/bookings?email=${user?.email}`;
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setBookings(data)
                }
                else {
                    navigate('/');
                }
                setBookings(data)
            })
    }, [url, navigate])

    const notify = () => toast.success('Deleted Successfully', {
        style: {
            background: 'linear-gradient(135deg, #ff6666, #ffcc66, #66ff66, #66ccff)'
        }
    });
    const notify2 = () => toast.success('Update Successfully', {
        style: {
            background: 'linear-gradient(150deg, #66ff66, #66ccff)'
        }
    });

    const handleDelete = id => {
        const proceed = confirm('Are you sure?');
        if (proceed) {
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        notify();
                        const remaining = bookings.filter(booking => booking._id !== id);
                        setBookings(remaining)
                    }
                })
        }
    }

    const handleBookingConfirm = id => {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const updated = bookings.find(booking => booking._id === id);
                    updated.status = 'confirm'
                    notify2();
                    const newBookings = [updated, ...remaining];
                    setBookings(newBookings)
                }
            })
    }
    return (
        <div>
            <Toaster />
            <div className="overflow-x-auto w-full mt-24">
                <table className="table w-full">
                    {/* head */}
                    <thead >
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleBookingConfirm={handleBookingConfirm}
                            ></BookingRow>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Bookings;