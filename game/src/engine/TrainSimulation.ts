import { useGameStore } from '../store/gameStore';

export class TrainSimulation {
  private lastTime: number = 0;

  public update(time: number) {
    if (this.lastTime === 0) {
      this.lastTime = time;
      return;
    }

    const deltaTime = (time - this.lastTime) / 1000;
    this.lastTime = time;

    // Get current state from store (avoiding React hooks since we are outside components)
    const state = useGameStore.getState();
    const train = state.train;

    // Realistic Physics Prototype
    const speed = Math.abs(train.velocity);
    
    // Traction Curve: Force decreases as speed increases (constant power above base speed)
    // Formula: F = min(MaxTraction, Power / v)
    const baseTractiveEffort = train.maxTraction;
    const maxPower = 4000000; // 4000 kW locomotive
    let availableTraction = baseTractiveEffort;
    if (speed > 10) {
      availableTraction = Math.min(baseTractiveEffort, maxPower / speed);
    }
    const tractionForce = train.throttle * availableTraction;
    
    const brakeForce = train.brake * train.maxBrake;
    
    // Davis Equation for Resistance: R = A + B*v + C*v^2
    const A = 1500; // Journal resistance
    const B = 20;   // Flange resistance
    const C = 2.5;  // Aerodynamic resistance
    const rollingResistance = A + (B * speed) + (C * speed * speed);
    
    // Net force
    let netForce = tractionForce - rollingResistance;
    
    // Apply brakes (opposite to velocity)
    if (train.velocity > 0.1) {
      netForce -= brakeForce;
    } else if (train.velocity < -0.1) {
      netForce += brakeForce;
    } else if (brakeForce > 0 || (tractionForce === 0 && speed < 0.1)) {
      // Full stop if velocity is very low and brakes are applied or rolling to stop
      netForce = 0;
      state.setTrainState({ velocity: 0 });
    }

    // F = m * a
    const acceleration = netForce / train.mass;
    
    // Update velocity and position
    let newVelocity = train.velocity + acceleration * deltaTime;
    
    // Prevent creeping backward when braking at low speed
    if (train.velocity > 0 && newVelocity < 0 && train.throttle === 0) {
        newVelocity = 0;
    }

    const newPosition = train.position + newVelocity * deltaTime;

    // Update the store
    state.setTrainState({
      acceleration,
      velocity: newVelocity,
      position: newPosition,
    });
  }
}

export const simulation = new TrainSimulation();
