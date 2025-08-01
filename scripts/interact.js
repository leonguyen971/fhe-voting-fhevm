const hre = require("hardhat");

async function main() {
  // Địa chỉ contract đã deploy trên local node
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Lấy instance contract
  const FHECounter = await hre.ethers.getContractFactory("FHECounter");
  const contract = FHECounter.attach(contractAddress);

  // --- Giả lập dữ liệu mã hóa encryptedInput & inputProof ---
  // TODO: Thay bằng dữ liệu mã hóa thực tế và proof
  const encryptedInput = "0x0000000000000000000000000000000000000000000000000000000000000001"; // giả định encrypted số 1
  const inputProof = "0x"; // giả định proof rỗng, sẽ bị revert nếu proof bắt buộc

  try {
    // Gọi getCount xem giá trị hiện tại
    const currentCount = await contract.getCount();
    console.log("Current encrypted count:", currentCount);

    // Gọi increment với dữ liệu giả lập
    const tx = await contract.increment(encryptedInput, inputProof);
    console.log("Increment tx sent:", tx.hash);

    await tx.wait();
    console.log("Transaction mined");

    // Lấy lại count sau increment
    const newCount = await contract.getCount();
    console.log("New encrypted count:", newCount);

  } catch (error) {
    console.error("Error interacting with contract:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
