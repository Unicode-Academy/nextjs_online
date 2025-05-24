export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="modal-content absolute left-0 right-0 top-[5%] w-[400px] mx-auto z-50 border bg-white min-h-[300px] p-10">
        {children}
      </div>
      <div className="modal-overlay absolute inset-0 bg-[#00000098]"></div>
    </>
  );
}
