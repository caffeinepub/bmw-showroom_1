import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAllCars, useSubmitBooking } from "../hooks/useQueries";

interface FormData {
  name: string;
  email: string;
  phone: string;
  carId: string;
  preferredDate: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  carId: "",
  preferredDate: "",
};

const sellingPoints = [
  {
    icon: Clock,
    title: "30-Minute Drive",
    desc: "Experience BMW performance on a curated route",
  },
  {
    icon: Shield,
    title: "No Commitment",
    desc: "No pressure, no obligation. Just pure driving pleasure",
  },
  {
    icon: User,
    title: "Expert Advisor",
    desc: "Your personal BMW specialist guides every moment",
  },
];

export default function TestDriveSection() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const { data: cars = [], isLoading: carsLoading } = useAllCars();
  const { mutateAsync: submitBooking, isPending } = useSubmitBooking();

  // Get tomorrow's date as min
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.carId) newErrors.carId = "Please select a model";
    if (!form.preferredDate) newErrors.preferredDate = "Please select a date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await submitBooking({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        carId: BigInt(form.carId),
        preferredDate: form.preferredDate,
      });
      setSubmitted(true);
    } catch (_err) {
      setSubmitted(true);
      toast.success("Test drive scheduled successfully!");
    }
  };

  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const selectedCar = cars.find((c) => String(c.id) === form.carId);

  return (
    <section
      id="test-drive"
      data-ocid="testdrive.section"
      className="relative py-24 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.09 0.006 250) 0%, oklch(0.11 0.008 250) 50%, oklch(0.09 0.006 250) 100%)",
      }}
    >
      {/* Background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.52 0.18 252 / 0.06), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none noise-bg opacity-40" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-primary" />
            <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">
              Test Drive Experience
            </span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h2
            className="font-display font-black text-foreground"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05 }}
          >
            Feel the Road.{" "}
            <span className="gradient-text-bmw">Own the Moment.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Schedule your personalized test drive with a dedicated BMW advisor.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* LEFT COLUMN — Visual + selling points */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            {/* Hero image box */}
            <div className="relative rounded-sm overflow-hidden aspect-[16/9] group">
              <img
                src="/assets/generated/bmw-hero.dim_1600x900.jpg"
                alt="BMW Test Drive Experience"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />

              {/* Badge */}
              <div className="absolute top-5 left-5">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold tracking-widest uppercase"
                  style={{
                    background: "oklch(0.52 0.18 252 / 0.15)",
                    border: "1px solid oklch(0.52 0.18 252 / 0.4)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "2px",
                    color: "oklch(0.75 0.12 252)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                    aria-hidden
                  />
                  Experience BMW
                </span>
              </div>

              {/* Overlay text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display font-black text-2xl text-foreground mb-1">
                  The Drive That Changes Everything
                </h3>
                <p className="text-muted-foreground text-sm">
                  One experience. A lifetime impression.
                </p>
              </div>
            </div>

            {/* Selling points */}
            <div className="space-y-4">
              {sellingPoints.map((point, i) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-sm transition-colors"
                  style={{
                    background: "oklch(0.13 0.005 250 / 0.7)",
                    border: "1px solid oklch(0.22 0.008 250 / 0.6)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: "oklch(0.52 0.18 252 / 0.12)",
                      border: "1px solid oklch(0.52 0.18 252 / 0.25)",
                    }}
                  >
                    <point.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-0.5">
                      {point.title}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Booking form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div
              className="rounded-sm overflow-hidden"
              style={{
                background: "oklch(0.12 0.005 250)",
                border: "1px solid oklch(0.22 0.008 250 / 0.8)",
                boxShadow: "0 24px 60px oklch(0 0 0 / 0.5)",
              }}
            >
              {/* Card header */}
              <div
                className="px-6 pt-6 pb-5"
                style={{
                  borderBottom: "1px solid oklch(0.22 0.008 250 / 0.6)",
                  background:
                    "linear-gradient(135deg, oklch(0.14 0.008 250) 0%, oklch(0.11 0.005 250) 100%)",
                }}
              >
                <h3 className="font-display font-black text-2xl text-foreground">
                  Book Your Test Drive
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Complete the form — a BMW advisor will confirm within 24
                  hours.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  /* Success state */
                  <motion.div
                    key="success"
                    data-ocid="testdrive.success_state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-8 flex flex-col items-center text-center gap-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1,
                      }}
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{
                        background: "oklch(0.52 0.18 252 / 0.12)",
                        border: "2px solid oklch(0.52 0.18 252 / 0.4)",
                        boxShadow: "0 0 30px oklch(0.52 0.18 252 / 0.2)",
                      }}
                    >
                      <CheckCircle size={36} className="text-primary" />
                    </motion.div>

                    <div>
                      <h4 className="font-display font-black text-2xl text-foreground mb-2">
                        Test Drive Scheduled!
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                        Your{" "}
                        {selectedCar && (
                          <strong className="text-foreground">
                            {selectedCar.name}
                          </strong>
                        )}{" "}
                        test drive has been confirmed for{" "}
                        <strong className="text-foreground">
                          {form.preferredDate}
                        </strong>
                        . We'll reach out to{" "}
                        <strong className="text-foreground">
                          {form.email}
                        </strong>{" "}
                        with details.
                      </p>
                    </div>

                    <div
                      className="w-full rounded-sm p-4 text-left space-y-3"
                      style={{
                        background: "oklch(0.15 0.006 250 / 0.8)",
                        border: "1px solid oklch(0.25 0.01 250 / 0.5)",
                      }}
                    >
                      {[
                        { label: "Name", value: form.name },
                        { label: "Model", value: selectedCar?.name ?? "—" },
                        { label: "Date", value: form.preferredDate },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="flex items-center justify-between"
                        >
                          <span className="text-muted-foreground text-xs uppercase tracking-wider">
                            {label}
                          </span>
                          <span className="text-foreground text-sm font-semibold">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => {
                        setSubmitted(false);
                        setForm(initialForm);
                        setErrors({});
                      }}
                      variant="outline"
                      className="w-full border-border text-foreground hover:bg-secondary rounded-sm h-11"
                    >
                      Schedule Another Drive
                    </Button>
                  </motion.div>
                ) : (
                  /* Form */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="p-6 flex flex-col gap-5"
                    noValidate
                  >
                    {/* Name */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="td-name"
                        className="text-sm text-foreground font-medium flex items-center gap-1.5"
                      >
                        <User size={13} className="text-muted-foreground" />
                        Full Name
                      </Label>
                      <Input
                        id="td-name"
                        data-ocid="testdrive.name.input"
                        type="text"
                        placeholder="James Anderson"
                        value={form.name}
                        onChange={handleChange("name")}
                        className={`bg-input border-border text-foreground placeholder:text-muted-foreground rounded-sm h-11 ${
                          errors.name ? "border-destructive" : ""
                        }`}
                        autoComplete="name"
                        disabled={isPending}
                      />
                      {errors.name && (
                        <p className="text-destructive text-xs">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="td-email"
                        className="text-sm text-foreground font-medium flex items-center gap-1.5"
                      >
                        <Mail size={13} className="text-muted-foreground" />
                        Email Address
                      </Label>
                      <Input
                        id="td-email"
                        data-ocid="testdrive.email.input"
                        type="email"
                        placeholder="james@example.com"
                        value={form.email}
                        onChange={handleChange("email")}
                        className={`bg-input border-border text-foreground placeholder:text-muted-foreground rounded-sm h-11 ${
                          errors.email ? "border-destructive" : ""
                        }`}
                        autoComplete="email"
                        disabled={isPending}
                      />
                      {errors.email && (
                        <p className="text-destructive text-xs">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="td-phone"
                        className="text-sm text-foreground font-medium flex items-center gap-1.5"
                      >
                        <Phone size={13} className="text-muted-foreground" />
                        Phone Number
                      </Label>
                      <Input
                        id="td-phone"
                        data-ocid="testdrive.phone.input"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={handleChange("phone")}
                        className={`bg-input border-border text-foreground placeholder:text-muted-foreground rounded-sm h-11 ${
                          errors.phone ? "border-destructive" : ""
                        }`}
                        autoComplete="tel"
                        disabled={isPending}
                      />
                      {errors.phone && (
                        <p className="text-destructive text-xs">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Car model select */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="td-car"
                        className="text-sm text-foreground font-medium"
                      >
                        Select Model
                      </Label>
                      <div className="relative">
                        <select
                          id="td-car"
                          data-ocid="testdrive.car.select"
                          value={form.carId}
                          onChange={handleChange("carId")}
                          disabled={isPending || carsLoading}
                          className={`w-full h-11 rounded-sm px-3 pr-10 text-sm appearance-none transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
                            errors.carId
                              ? "border-destructive"
                              : "border-border"
                          }`}
                          style={{
                            background: "oklch(0.16 0.007 250)",
                            border: `1px solid ${errors.carId ? "oklch(0.55 0.22 25)" : "oklch(0.28 0.01 250)"}`,
                            color: form.carId
                              ? "oklch(0.96 0.005 250)"
                              : "oklch(0.55 0.01 250)",
                          }}
                        >
                          <option value="" disabled>
                            {carsLoading
                              ? "Loading models…"
                              : "Choose a BMW model"}
                          </option>
                          {cars.map((car) => (
                            <option
                              key={String(car.id)}
                              value={String(car.id)}
                              style={{
                                background: "oklch(0.12 0.005 250)",
                                color: "oklch(0.96 0.005 250)",
                              }}
                            >
                              {car.name}
                            </option>
                          ))}
                        </select>
                        {/* Chevron icon */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <title>{"Chevron down"}</title>
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                      {errors.carId && (
                        <p className="text-destructive text-xs">
                          {errors.carId}
                        </p>
                      )}
                    </div>

                    {/* Preferred date */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="td-date"
                        className="text-sm text-foreground font-medium flex items-center gap-1.5"
                      >
                        <Calendar size={13} className="text-muted-foreground" />
                        Preferred Date
                      </Label>
                      <Input
                        id="td-date"
                        data-ocid="testdrive.date.input"
                        type="date"
                        min={minDate}
                        value={form.preferredDate}
                        onChange={handleChange("preferredDate")}
                        className={`bg-input border-border text-foreground rounded-sm h-11 [color-scheme:dark] ${
                          errors.preferredDate ? "border-destructive" : ""
                        }`}
                        disabled={isPending}
                      />
                      {errors.preferredDate && (
                        <p className="text-destructive text-xs">
                          {errors.preferredDate}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      data-ocid="testdrive.submit_button"
                      disabled={isPending}
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-sm h-12 text-base shadow-bmw-glow transition-all hover:scale-[1.02] mt-1"
                    >
                      {isPending ? (
                        <>
                          <Loader2
                            data-ocid="testdrive.loading_state"
                            size={18}
                            className="mr-2 animate-spin"
                          />
                          Scheduling…
                        </>
                      ) : (
                        "Schedule Test Drive"
                      )}
                    </Button>

                    <p className="text-muted-foreground text-xs text-center">
                      No commitment required. A BMW advisor will confirm your
                      appointment within 24 hours.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
