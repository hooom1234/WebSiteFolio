// src/data/myproject/lksbrightsteps.js

export const projectData = {
  title: "LKSBrightSteps",
  subtitle: "แอปพลิเคชันเก็บบันทึกข้อมูลพฤติกรรมของเด็กที่บกพร่องทางด้านการเรียนรู้",
  description: "LKSBrightSteps เป็น Mobile Application ที่พัฒนาขึ้นเพื่อช่วยครูและผู้ปกครองในการติดตามและบันทึกพฤติกรรมของเด็กที่มีความบกพร่องทางการเรียนรู้ (Learning Disabilities) โดยมีการวิเคราะห์ผลในรูปแบบกราฟและการส่งออกรายงาน เพื่อให้การดูแลและพัฒนาเด็กเป็นไปอย่างมีประสิทธิภาพ",
  tags: ["React Native", "PHP", "MySQL", "REST API", "Linux Server"],

  // --- ✨ ส่วน Gallery (เพิ่ม/ลบรูปได้จากตรงนี้) ✨ ---
  gallery: [
    {
      src: "https://res.cloudinary.com/dg0uswwo4/image/upload/f_auto/v1765019138/%E0%B8%AA%E0%B8%81%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%95_2025-12-06_180131_dckvmf.png",
      alt: "Mobile Application Interface",
      caption: "Login Interface"
    },
    {
      src: "https://res.cloudinary.com/dg0uswwo4/image/upload/f_auto/v1765023660/%E0%B8%AA%E0%B8%81%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%95_2025-12-06_192030_pmvntr.png",
      alt: "Data Visualization Dashboard",
      caption: "Software Structure"
    },
    
   
  ],
  
  // --- เนื้อหาแต่ละส่วน (Sections) ---
  sections: [
    {
      id: "intro",
      title: "ที่มาและความสำคัญ",
      content: "โปรเจกต์นี้เกิดขึ้นเพื่อแก้ปัญหาการบันทึกพฤติกรรมในรูปแบบกระดาษที่อาจสูญหายและยากต่อการวิเคราะห์แนวโน้ม แอปพลิเคชันนี้จึงเข้ามาช่วยแปลงข้อมูลพฤติกรรมให้เป็น Digital Data ที่สามารถดูย้อนหลังและแจ้งเตือนผู้ปกครองได้ทันที",
    },
    {
      id: "architecture",
      title: "สถาปัตยกรรมระบบ (System Architecture)",
      content: "ระบบแบ่งการทำงานเป็น 2 ส่วนหลัก คือ Front-end พัฒนาด้วย React Native สำหรับ Mobile App และ Back-end ใช้ PHP ร่วมกับ MySQL บน Linux Server โดยสื่อสารกันผ่าน REST API",
    },
    {
      id: "features",
      title: "ฟีเจอร์หลัก (Key Features)",
      list: [
        "ระบบล็อกอินแยกประเภทผู้ใช้ (Reporter, Parent, Admin)",
        "การบันทึกพฤติกรรมพร้อมระบุระดับความรุนแรง (เขียว/เหลือง/แดง)",
        "ระบบแจ้งเตือนและติดตามผลแบบ Real-time",
        "การแสดงผลกราฟวิวัฒนาการ (Evolution Graph)",
        "การออกรายงานในรูปแบบ PDF"
      ]
    }
  ],

  // --- Code Snippets (ตัวอย่างโค้ด) ---
  codeSnippets: {
    login: `// React Native: Login Function (Authentication)
const submitLogin = async () => {
  try {
    const response = await axios.post(
      \`\${API_URL}Login-System/login-Reporter.php\`,
      { id: userId, password }
    );
    
    if (response.data.status === "success") {
      setUserId(response.data.id); // Context State Update
      navigation.navigate("Home");
    } else {
      Alert.alert("Error", "ID or Password incorrect");
    }
  } catch (error) {
    console.error(error);
  }
};`,
    
    backendLogin: `// PHP: Verify Password Hash (Backend Logic)
$sql = "SELECT id, password FROM reporteracc WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    // ใช้ password_verify เพื่อความปลอดภัย
    if (password_verify($input_password, $row['password'])) {
        $_SESSION["user_id"] = $user_id;
        echo json_encode(["status" => "success"]);
    }
}`,
    getdata_history: `useEffect(() => {
    if (!parentId || !studentId) return;

    setLoading(true);

    axios
      .get(
        \`\${API_URL}Parent-System/student-history.php?parent=\${parentId}&student=\${studentId}\`\)
      .then((response) => {
        if (!response.data || response.data.error) {
          setAccessDenied(true);
        } else {
          setHistory(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
        Alert.alert("Error", "Could not load data.");
      })
      .finally(() => setLoading(false));
  }, [parentId, studentId]);`,
    backendgetdata_history: `// Check parent access permission on the student data
$check_sql = "SELECT * FROM request WHERE parent = ? AND student = ? AND status = 'true'";
$check_stmt = $conn->prepare($check_sql);
$check_stmt->bind_param("ss", $parentId, $studentId);
$check_stmt->execute();
$check_result = $check_stmt->get_result();

if ($check_result->num_rows == 0) {
    die(json_encode(["error" => "Access denied"], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

// if permission granted, fetch student data
$sql = "SELECT * FROM student WHERE studentId = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $studentId);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}`,
    backendgetdata_graph: `$sql = "SELECT level, time FROM student WHERE studentId = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    die(json_encode(["error" => "SQL Prepare Failed: " . $conn->error]));
}
$stmt->bind_param("s", $studentId);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}`,
    saveData: `const submitStudentData = async (id, type, level, detail, time, reporter) => {
  try {
    const response = await axios.post(API_URL2, {
      studentId: id,
      type,
      level,
      detail,
      time,
      reporter,
    }, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return { status: "error", message: "Failed to submit data" };
  }
};

const StudentForm = () => {
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");
  const handleLevelPress = (selectedLevel) => {
    if (level === selectedLevel) {
      setLevel(""); 
    } else {
      setLevel(selectedLevel); 
    }
  };
  const [detail, setDetail] = useState("");

  const { studentId } = useStudent();
  const { userId } = useUser();
  const navigation = useNavigation(); 
  const [showAlert, setShowAlert] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
  const fadeAnim = useState(new Animated.Value(0))[0];`,
    backendsaveData: `$data = json_decode(file_get_contents("php://input"));

if (!isset($data->studentId, $data->type, $data->level, $data->detail, $data->time, $data->reporter)) {
    echo json_encode(["status" => "error", "message" => "ข้อมูลไม่ครบถ้วน"]);
    exit;
}

$studentId = $data->studentId;
$type = $data->type;
$level = $data->level;
$detail = $data->detail;
$time = $data->time;
$reporter = $data->reporter;

$sql = "INSERT IGNORE INTO student (studentId, type, level, detail, time, reporter) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $studentId, $type, $level, $detail, $time, $reporter);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}`
  }
};