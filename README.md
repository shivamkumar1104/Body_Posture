# Real-Time Body Posture Detection (PoseNet Demo)

An interactive web application that performs real-time human pose estimation using the **PoseNet** model. It captures live video from your webcam, tracks 17 key body joints (like nose, eyes, shoulders, elbows, etc.), and overlays a dynamic colorful skeleton map on the screen.

This project is built using the **p5.js** library for graphics rendering and the **ml5.js** library for machine learning in the browser.

---

## 🚀 Features
- **Real-Time Webcam Capture:** Streams live camera feed directly onto the canvas.
- **Pose Detection:** Automatically tracks the user's body posture using PoseNet.
- **Keypoint Mapping:** Highlights active joints with random color-changing circles.
- **Skeletal Connection:** Draws a connecting skeleton overlay (lines) between key joints.
- **Labeling:** Displays names of the tracked parts next to the keypoints in real time.

---

## 🛠️ Tech Stack
- **HTML5 & CSS3**
- **JavaScript (ES6+)**
- **p5.js** (v1.2.0) - Creative coding library for HTML5 canvas and webcam capture.
- **ml5.js** (v0.12.2) - TensorFlow.js-powered library for machine learning models.
- **PoseNet Model** - Pre-trained deep learning model for single/multi-person pose estimation.

---

## 📁 Project Structure
```text
Body_posture/
├── index.html       # The main HTML structure loaded with CDN links
├── sketch.js        # p5.js setup, draw loop, and ml5.js PoseNet setup
├── README.md        # Project documentation
└── images/          # Image assets folder
    └── shivam.png
```

---

## 💻 How to Run the Project
1. **Clone or Download** the folder.
2. PoseNet requires webcam access, which modern browsers restrict under strict security policies unless served over `localhost` or `https`.
3. Open the project folder in **Visual Studio Code**.
4. Install the **Live Server** extension in VS Code.
5. Click **"Go Live"** from the bottom right corner of VS Code to start a local development server.
6. Grant camera permissions when prompted by your browser.

---

## ⚠️ Bug Fixes & Suggestions (Important)
During the code review of `sketch.js`, a couple of small typos were identified that might prevent keypoints or skeleton connections from drawing correctly. Here is how you can fix them:

### 1. Typo in Keypoint Drawing (Line 46 & 49)
In `sketch.js`, the code uses `keypoints.position` instead of `keypoint.position`. 
* **Incorrect:**
  ```javascript
  ellipse(keypoints.position.x, keypoints.position.y, 15);
  text(keypoint.part, keypoints.position.x + 10, keypoints.position.y + 20);
  ```
* **Correct:**
  ```javascript
  ellipse(keypoint.position.x, keypoint.position.y, 15);
  text(keypoint.part, keypoint.position.x + 10, keypoint.position.y + 20);
  ```

### 2. Skeleton Joint Score Check (Line 59-65)
The variables `sk1` and `sk2` store the `.position` object, but the condition checks for `sk1.score` and `sk2.score`. Since `.position` does not have a `score` attribute (it is at the parent level), the skeleton lines may not draw.
* **Incorrect:**
  ```javascript
  let sk1 = skeleton[j][0].position;
  let sk2 = skeleton[j][1].position;
  if(sk1.score > 0.8 && sk2.score > 0.8){
      line(sk1.x, sk1.y, sk2.x, sk2.y);
  }
  ```
* **Correct:**
  ```javascript
  let part1 = skeleton[j][0];
  let part2 = skeleton[j][1];
  if(part1.score > 0.5 && part2.score > 0.5){ // Lowered score threshold slightly for smoother connections
      let sk1 = part1.position;
      let sk2 = part2.position;
      line(sk1.x, sk1.y, sk2.x, sk2.y);
  }
  ```

---

## 📄 License
This project is open-source and free to use for learning and development.
