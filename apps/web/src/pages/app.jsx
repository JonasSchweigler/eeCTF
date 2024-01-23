import { useEffect, useState } from "react";
import Machines from "../components/machine";
import Challenge from "../components/challenge";
import { ToastContainer } from "react-toastify";
import apiClient from "../libs/api.client";

function Player() {
  const token = localStorage.getItem("token");
  const [machines, setMachines] = useState([]);
  const [currentExpandedMachine, setCurrentExpandedMachine] = useState(1);
  const [currentChallenge, setCurrentChallenge] = useState([
    currentExpandedMachine,
    -1,
  ]);

  useEffect(() => {
    if (!token) return (window.location.href = "/");

    apiClient
      .get("/challenge/progress", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (!Array.isArray(res.data.message)) return (window.location.href = "/");
        if (res.data.message === "Invalid token")
          return (window.location.href = "/");
        setMachines(res.data.message);
      });
  }, [token]);

  return (
    <>
      {/* <Navbar /> */}
      <div className='player-component'>
        <div className='player-machine-section'>
          <div className='player-machine-detail'>
            <h1 className='player-machine-title'>Machines</h1>
            <div className='player-mlist'>
              {machines.map((machine, index) => (
                <Machines
                  key={index}
                  name={machine.name}
                  setExpanded={setCurrentExpandedMachine}
                  challenges={machine.challenges}
                  expanded={currentExpandedMachine}
                  kid={index}
                  setCurrentChallenge={setCurrentChallenge}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='player-challenge-detail-section'>
          <div className='player-challenge-detail'>
            {currentChallenge[0] > -1 && currentChallenge[1] > -1 && (
              <Challenge
                desp={
                  machines[currentChallenge[0]].challenges[currentChallenge[1]]
                    .description
                }
                name={
                  machines[currentChallenge[0]].challenges[currentChallenge[1]]
                    .name
                }
                point={
                  machines[currentChallenge[0]].challenges[currentChallenge[1]]
                    .point
                }
                tags={
                  machines[currentChallenge[0]].challenges[currentChallenge[1]]
                    .tags
                }
                id={
                  machines[currentChallenge[0]].challenges[currentChallenge[1]]
                    .id
                }
                madeby={
                  machines[currentChallenge[0]].challenges[currentChallenge[1]]
                    .madeby
                }
                setMachines={setMachines}
                solved={
                  machines[currentChallenge[0]].challenges[currentChallenge[1]]
                    .solved
                }
              />
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  );
}

export default Player;
