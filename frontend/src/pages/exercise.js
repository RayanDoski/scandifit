import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// Importing CSS
import '../styles/workout.css';

// For Login
import NotLiAuthCheck from './loginSystem/notLiAuthCheck.js';

// importing Secondary Header
import SecondaryHeader from '../components/secondaryHeader.js';

// Importing Loading Screen
import loadingScreenFullScreen from '../components/loadingScreenFullScreen.js';

// Importing Images
import bagWork from '../images/workouts/bag-work.jpg';
import bandFrontRaise from '../images/workouts/Band-front-raise.jpg';
import bandShoulderPress from '../images/workouts/Band-shoulder-press.jpg';
import barbellBenchPress from '../images/workouts/Barbell-Bench-Press.jpg';
import barbellCurl from '../images/workouts/barbell-curl.jpg';
import barbellDeadlift from '../images/workouts/Barbell-Deadlift.jpg';
import barbellMilitaryPress from '../images/workouts/barbell-military-press.jpg';
import barbellSquat from '../images/workouts/barbell-squat.jpg';
import bentOverBarbellRow from '../images/workouts/Bent-over-barbell-row.jpg';
import bicepsLegCurl from '../images/workouts/Biceps-leg-curl.jpg';
import bodyweightSquat from '../images/workouts/bodyweight-squat.jpg';
import bodyweightTriceps from '../images/workouts/bodyweight-triceps.jpg';
import bulgarianSplitSquat from '../images/workouts/Bulgarian-split-squat.jpg';
import burpees from '../images/workouts/burpees.jpg';
import cableCloseGripPullDown from '../images/workouts/Cable-close-grip-pull-down.jpg';
import captainsChairLegHipRaise from '../images/workouts/captains-chair-leg-and-hip-raise.jpg';
import captainsChairStraightLegRaise from '../images/workouts/Captains-chair-straight-leg-raise.jpg';
import closeGripPushups from '../images/workouts/closegrip-pushups.jpg';
import crossArmPushUp from '../images/workouts/Cross-arm-push-up.jpg';
import crunchResized from '../images/workouts/Crunch-resized.jpg';
import crunchWithLegRaise from '../images/workouts/Crunch-with-leg-raise.jpg';
import diamondPushups from '../images/workouts/diamond-pushups.jpg';
import dumbbellAlternateBicepsCurl from '../images/workouts/Dumbbell-Alternate-Biceps-Curl.jpg';
import dumbbellHammerCurl from '../images/workouts/Dumbbell-Hammer-Curl.jpg';
import dumbbellLunge from '../images/workouts/Dumbbell-Lunge.jpg';
import extraDeclineSitUp from '../images/workouts/Extra-decline-sit-up.jpg';
import ezBarReverseCurl from '../images/workouts/EZ-bar-reverse-curl.jpg';
import ezBarWideGripUprightRow from '../images/workouts/EZ-bar-wide-grip-upright-row.jpg';
import highKnees from '../images/workouts/high-knees.jpg';
import jumpingJacks from '../images/workouts/jumping-jacks.jpg';
import jumpingRope from '../images/workouts/jumping-rope.jpg';
import leverLegExtensionResized from '../images/workouts/lever-leg-extension-resized.jpg';
import leverSeatedCalfRaisePlateLoaded from '../images/workouts/Lever-Seated-Calf-Raise-plate-loaded.jpg';
import lyingLegCurl from '../images/workouts/lying-leg-curl.jpg';
import machineFly from '../images/workouts/Machine-Fly.jpg';
import one from '../images/workouts/one.jpg';
import pullUp from '../images/workouts/pull-up.jpg';
import pushups from '../images/workouts/pushups.jpg';
import seatedBarbellTwist from '../images/workouts/seated-barbell-twist.jpg';
import seatedBentOverLateralRaise from '../images/workouts/seated-bent-over-lateral-raise.jpg';
import seatedDumbbellFrontRaise from '../images/workouts/Seated-Dumbbell-Front-Raise.jpg';
import seatedDumbbellOverheadTricepsExtension from '../images/workouts/seated-dumbbell-overhead-triceps-extension.jpg';
import sled45DegreeLegPress from '../images/workouts/Sled-45-degree-Leg-Press.jpg';
import supermanExercise from '../images/workouts/superman-exercise.jpg';
import treadmil from '../images/workouts/treadmil.jpg';
import tricepsDip from '../images/workouts/triceps-dip.jpg';
import tricepsRopePushdown from '../images/workouts/Triceps-Rope-Pushdown.jpg';

const API_BASE_URL = process.env.REACT_APP_API_URL

// Map image filenames to imports
const workoutImages = {
    "bag-work.jpg": bagWork,
    "Band-front-raise.jpg": bandFrontRaise,
    "Band-shoulder-press.jpg": bandShoulderPress,
    "Barbell-Bench-Press.jpg": barbellBenchPress,
    "barbell-curl.jpg": barbellCurl,
    "Barbell-Deadlift.jpg": barbellDeadlift,
    "barbell-military-press.jpg": barbellMilitaryPress,
    "barbell-squat.jpg": barbellSquat,
    "Bent-over-barbell-row.jpg": bentOverBarbellRow,
    "Biceps-leg-curl.jpg": bicepsLegCurl,
    "bodyweight-squat.jpg": bodyweightSquat,
    "bodyweight-triceps.jpg": bodyweightTriceps,
    "Bulgarian-split-squat.jpg": bulgarianSplitSquat,
    "burpees.jpg": burpees,
    "Cable-close-grip-pull-down.jpg": cableCloseGripPullDown,
    "captains-chair-leg-and-hip-raise.jpg": captainsChairLegHipRaise,
    "Captains-chair-straight-leg-raise.jpg": captainsChairStraightLegRaise,
    "closegrip-pushups.jpg": closeGripPushups,
    "Cross-arm-push-up.jpg": crossArmPushUp,
    "Crunch-resized.jpg": crunchResized,
    "Crunch-with-leg-raise.jpg": crunchWithLegRaise,
    "diamond-pushups.jpg": diamondPushups,
    "Dumbbell-Alternate-Biceps-Curl.jpg": dumbbellAlternateBicepsCurl,
    "Dumbbell-Hammer-Curl.jpg": dumbbellHammerCurl,
    "Dumbbell-Lunge.jpg": dumbbellLunge,
    "Extra-decline-sit-up.jpg": extraDeclineSitUp,
    "EZ-bar-reverse-curl.jpg": ezBarReverseCurl,
    "EZ-bar-wide-grip-upright-row.jpg": ezBarWideGripUprightRow,
    "high-knees.jpg": highKnees,
    "jumping-jacks.jpg": jumpingJacks,
    "jumping-rope.jpg": jumpingRope,
    "lever-leg-extension-resized.jpg": leverLegExtensionResized,
    "Lever-Seated-Calf-Raise-plate-loaded.jpg": leverSeatedCalfRaisePlateLoaded,
    "lying-leg-curl.jpg": lyingLegCurl,
    "Machine-Fly.jpg": machineFly,
    "one.jpg": one,
    "pull-up.jpg": pullUp,
    "pushups.jpg": pushups,
    "seated-barbell-twist.jpg": seatedBarbellTwist,
    "seated-bent-over-lateral-raise.jpg": seatedBentOverLateralRaise,
    "Seated-Dumbbell-Front-Raise.jpg": seatedDumbbellFrontRaise,
    "seated-dumbbell-overhead-triceps-extension.jpg": seatedDumbbellOverheadTricepsExtension,
    "Sled-45-degree-Leg-Press.jpg": sled45DegreeLegPress,
    "superman-exercise.jpg": supermanExercise,
    "treadmil.jpg": treadmil,
    "triceps-dip.jpg": tricepsDip,
    "Triceps-Rope-Pushdown.jpg": tricepsRopePushdown,
    // Add other mappings...
};

function Exercises() {

    const { id } = useParams();
    const [workout, setWorkout] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // useNavigate hook for programmatic navigation

    // Are They Logged In? 
    NotLiAuthCheck()

    const fetchWorkout = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/workout/${id}`, {
                method: 'POST',
                credentials: 'include'  // Include credentials (cookies)
            });
            const data = await response.json();
            setWorkout(data.workout);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch plan:', error);
            setError('Failed to fetch workouts. Please try again.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkout();
    }, [id]); // Add muscle as a dependency to refetch when it changes

    return (
        <>
            { loading ? <loadingScreenFullScreen /> : '' }
            <SecondaryHeader />
            <section className="workout">
                <main>
                    <img src={workoutImages[workout[3]]} alt="Exercise Picture" />
                    <h2>ÖVNINGSDATABAS</h2>
                    <h1>{ workout[1] }</h1>
                    <h3><strong>Målmuskel:</strong> { workout[2] }</h3>
                    <p><strong>Beskrivning</strong></p>
                    <p>{ workout[4] }</p>
                </main>
            </section>
        </>
    );
}

export default Exercises;