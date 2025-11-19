# 分贝（dB）体系深度解析：理论、应用与工程实践

<div style="display:flex; justify-content:space-between; font-weight:600;">
  <span>作者: Daniel_清寒</span>
  <span>时间: 2025-11-18</span>
</div>

---

## 引言

本篇文章系统解析分贝（dB）体系，从对数基础、功率与电压关系， 到声学中的 dB SPL、数字音频中的 dBFS、LUFS， 再到电路与射频工程中的 dBm、dBV、dBu 与天线增益 dBi/dBd， 层层递进。文章不仅推导公式， 更结合实际工程应用、例题与对照表帮助读者真正理解 dB 的物理意义与使用场景， 是一份全面、专业、可实践的分贝体系深度指南。

---

## 1. 简介

分贝（decibel, dB）是工程学中广泛使用的对数量纲，用于描述功率、幅度、声压、电压、电流及其他物理量之间的比值。其本质是一个**无量纲的对数单位**，但在电声工程、电子工程、通信工程、音频剪辑、天线设计等领域具有具体且不同的参考值与应用场景。

**为什么需要分贝？**

1.  **动态范围压缩**：工程中遇到的物理量（如声压、信号功率）变化范围极大，可能跨越十几个数量级。使用线性坐标难以在同一图表中清晰表示。例如，人耳能感知的声压范围约为 $20 \mu\mathrm{Pa}$ 到 $20 \mathrm{Pa}$，比值高达 $10^6$。
2.  **符合人类感知**：人类的听觉、视觉等感官对刺激的响应大致符合对数规律，即韦伯-费希纳定律。使用分贝描述的信号强度变化更贴近人的主观感受。
3.  **计算简化**：在通信系统和信号处理链路上，多个增益/损耗模块级联时，总增益/损耗是各模块的乘积。在对数域（分贝）中，乘法变为加法，大大简化了计算。

本说明文档旨在系统阐述分贝体系的数学原理、工程意义、不同参考框架与具体应用。

---

## 2. 分贝的数学基础

### 2.1 对数（Logarithm）回顾

分贝的核心是对数运算。对数是指数的逆运算。如果 $a^y = x$，那么 $y = \log_a(x)$。在分贝计算中，我们几乎总是使用以 $10$ 为底的常用对数（$\log_{10}$）。

**重要性质：**
- $\log_{10}(10) = 1$
- $\log_{10}(1) = 0$
- $\log_{10}(10^n) = n$
- $\log_{10}(A \times B) = \log_{10}(A) + \log_{10}(B)$
- $\log_{10}(A / B) = \log_{10}(A) - \log_{10}(B)$
- $\log_{10}(A^n) = n \times \log_{10}(A)$

**例题 2.1：** 计算 $\log_{10}(1000)$ 和 $\log_{10}(0.001)$。

**解：**
$\log_{10}(1000) = \log_{10}(10^3) = 3$
$\log_{10}(0.001) = \log_{10}(10^{-3}) = -3$

### 2.2 贝尔（Bel）与分贝（Decibel）

最初，科学家使用“贝尔”（Bel, B）来表示功率比：

$$
G_{P,\mathrm{B}} = \log_{10}\!\left( \frac{P_1}{P_0} \right)
$$

但贝尔单位过大，使用不便。因此，更常用的单位是“分贝”（$deci-bel, dB$），$1 Bel = 10 decibels$。

**功率比的分贝定义：**

$$
G_{P,\mathrm{dB}} = 10 \log_{10}\!\left( \frac{P_1}{P_0} \right)
$$

**关键点：**
- 分贝表示的是**比值**，无量纲。
- $P_1$ 是被测量或输出功率。
- $P_0$ 是参考功率。
- 系数 $10$ 是因为 1 dB = 0.1 B。

**例题 2.2：** 一个放大器的输出功率是输入功率的 $100$ 倍，求其功率增益 $G_{P,\mathrm{dB}}$。

**解：**

$$G_{P,\mathrm{dB}} = 10 \log_{10}(100) = 10 \times 2 = 20 \mathrm{dB}$$

**例题 2.3：** 一个衰减器的输出功率是输入功率的 $1/1000$，求其功率增益 $G_{P,\mathrm{dB}}$。

**解：**

$$
\begin{aligned}
G_{P,\mathrm{dB}} 
&= 10 \log_{10}\left( \frac{1}{1000} \right) \\[10pt]
&= 10 \times (-3) \\[10pt]
&= -30 \mathrm{dB} \\[10pt]
\end{aligned}
$$

负分贝值表示衰减或损耗。

### 2.3 幅度量（电压、电流、声压）的分贝表示

在许多情况下，我们直接测量的是电压 $V$、电流 $I$ 或声压 $p$，而不是功率。功率 $P$ 与这些幅度量 $A$ 的平方成正比（例如，在电阻 $R$ 上，$P = \frac{V^2}{R}$）。

**推导过程：**

1. 功率比： 
   $$
   \frac{P_1}{P_0} = \left(\frac{A_1}{A_0}\right)^2
   $$
2. 代入功率分贝公式：
   $$
   \begin{aligned}
   G_{P,\mathrm{dB}} 
   &= 10 \log_{10}\!\left( \frac{P_1}{P_0} \right) \\[10pt]
   &= 10 \log_{10}\!\left( \left(\frac{A_1}{A_0}\right)^2 \right) \\[10pt]
   \end{aligned}
   $$
3. 利用对数性质： 
   $$
   \begin{aligned}
   G_{P,\mathrm{dB}} 
   &= 10 \times 2 \times \log_{10}\!\left( \frac{A_1}{A_0} \right) \\[10pt]
   &= 20 \log_{10}\!\left( \frac{A_1}{A_0} \right) \\[10pt]
   \end{aligned}
   $$

因此，**对于幅度量（电压、电流、声压）**，分贝定义为：

$$
G_{A,\mathrm{dB}} = 20 \log_{10}\!\left( \frac{A_1}{A_0} \right)
$$

**核心记忆点：功率用10log，幅度用20log。**

**例题 2.4：** 一个放大器的输出电压是输入电压的 $10$ 倍，且输入输出阻抗相同。求其电压增益 $G_{V,\mathrm{dB}}$。

**解：**
$G_{V,\mathrm{dB}} = 20 \log_{10}(10) = 20 \times 1 = 20 \mathrm{dB}$

**注意：** 虽然此例中电压增益和功率增益都是 $20 \mathrm{dB}$，但这仅在阻抗相同的条件下成立。如果阻抗不同，$20 \log_{10}(\frac{V_{out}}{V_{in}})$ 给出的电压增益分贝值，并不等于实际的功率增益分贝值。

---

## 3. 声学中的分贝 —— 声压级（Sound Pressure Level, SPL）

### 3.1 声压与声强

声音在空气中传播是压力的波动。声压 $p$ 是相对于大气压力的变化量。人耳能感知的声压范围极广，从听阈 $20 \mu\mathrm{Pa}$ 到痛阈 $20 \mathrm{Pa}$。
声强 $I$ 是单位面积上通过的声功率，与声压的平方成正比：$I \propto p^2$。

### 3.2 声压级（SPL）定义

为了压缩动态范围并符合人耳感知，声学中定义**声压级（SPL）**：

$$
L_p = 20 \log_{10}\!\left( \frac{p}{p_0} \right)\quad\text{(dB SPL)},
$$

其中参考声压 $p_0$ 取人耳的平均听阈：

$$
p_0 = 20\,\mu\mathrm{Pa} = 2 \times 10^{-5} \,\mathrm{Pa}.
$$

**为什么用 $20\log$？** 因为声压是幅度量，且声强 $I \propto p^2$。

**例题 3.1：** 正常交谈的声压约为 $0.02 \,\mathrm{Pa}$，求其声压级。

**解：**

$$
\begin{aligned}
L_p 
&= 20 \log_{10}\!\left( \frac{0.02}{2 \times 10^{-5}} \right) \\[10pt]
&= 20 \log_{10}(1000) \\[10pt]
&= 20 \times 3 \\[10pt]
&= 60 \,\mathrm{dB \, SPL} \\[10pt]
\end{aligned}
$$

**例题 3.2：** 喷气式飞机附近的声压约为 $200 \,\mathrm{Pa}$，求其声压级。

**解：**

$$
\begin{aligned}
L_p 
&= 20 \log_{10}\!\left( \frac{200}{2 \times 10^{-5}} \right) \\[10pt]
&= 20 \log_{10}(10^7) \\[10pt]
&= 20 \times 7 \\[10pt]
&= 140 \,\mathrm{dB \, SPL} \\[10pt]
\end{aligned}
$$

### 3.3 常见声源声压级速查表

| 声源 | 近似声压 ($p$) | 近似声压级 ($L_p$) |
| :--- | :--- | :--- |
| 听阈 | $20 \mu\mathrm{Pa}$ | $0 \,\mathrm{dB SPL}$ |
| 安静的录音棚 | $0.0002 \,\mathrm{Pa}$ | $20 \,\mathrm{dB SPL}$ |
| 耳语 | $0.002 \,\mathrm{Pa}$ | $40 \,\mathrm{dB SPL}$ |
| 正常交谈 | $0.02 \,\mathrm{Pa}$ | $60 \,\mathrm{dB SPL}$ |
| 城市交通 | $0.2 \,\mathrm{Pa}$ | $80 \,\mathrm{dB SPL}$ |
| 割草机 | $2 \,\mathrm{Pa}$ | $100 \,\mathrm{dB SPL}$ |
| 摇滚音乐会 | $20 \,\mathrm{Pa}$ | $120 \,\mathrm{dB SPL}$ |
| 喷气式飞机起飞 | $200 \,\mathrm{Pa}$ | $140 \,\mathrm{dB SPL}$ |

---

## 4. 视频剪辑与数字音频：dBFS、RMS、峰值、LUFS

### 4.1 数字音频基础与 dBFS

在数字音频系统（如PCM编码）中，模拟信号的连续电压被离散化为数字样本。每个样本的幅度用一个二进制数表示。对于 $N$ 位系统，最大可表示的正数（满幅）是 $2^{(N-1)} - 1$（对于有符号整数，如16-bit音频为 $32767$）。

**dBFS（Decibels relative to Full Scale）** 定义为相对于这个数字满幅值的分贝值：

$$
A_{\mathrm{dBFS}} = 20\log_{10}\!\left(\frac{A}{A_{\max}}\right).
$$

其中 $A$ 是信号的**峰值幅度**（通常指一个样本的绝对值），$A_{\max}$ 是系统能表示的最大峰值幅度。

**关键特性：**
- $0\,\mathrm{dBFS}$ 是数字系统的上限，任何试图超过此值的信号都会被削波（Clipping），产生严重失真。
- 所有实际的、未削波的信号电平都小于 $0\,\mathrm{dBFS}$，因此其 dBFS 值为**负数**。

**例题 4.1：** 一个数字音频样本的幅度是最大可能值的 $\frac{1}{2}$，求其 dBFS。

**解：**

$$
\begin{aligned}
A_{\mathrm{dBFS}} 
&= 20 \log_{10}\left( \frac{1}{2} \right) \\[10pt]
&= 20 \times (-0.3010) \\[10pt]
&\approx -6.02 \,\mathrm{dBFS} \\[10pt]
\end{aligned}
$$

### 4.2 RMS 与峰值

- **峰值（Peak）**：$$A_{\mathrm{peak}} = \max |x(t)|$$
  它表示信号瞬时能达到的最大绝对值，是防止数字削波（Clipping）的关键参数。

- **均方根（RMS）**：$$A_{\mathrm{RMS}} = \sqrt{\frac{1}{T}\int_0^T x^2(t),dt}$$它表示信号的有效值。对于一个电压信号，其在纯电阻 $R$ 上产生的**平均功率**为 $$P_{\mathrm{avg}} = \frac{{A_{\mathrm{RMS}}}^2}{R}$$因此，RMS值比峰值更能反映信号的持续能量或“响度”。

#### 不同波形的RMS值与峰值关系

**1. 对于正弦波**

$$A_{\mathrm{RMS}} = \frac{A_{\mathrm{peak}}}{\sqrt{2}} \approx 0.707 \times A_{\mathrm{peak}}$$

因此，其峰值比RMS高 $20 \log_{10}(\sqrt{2}) \approx 3.01 \mathrm{dB}$。

**2. 对于方波**

方波的RMS值**取决于两个关键因素：电平范围（基线）和占空比（Duty Cycle, D）**，其中占空比 $D$ 是高电平持续时间与周期之比（$D = T_{\mathrm{high}} / T$）。

**情况一：单极性方波（在 $0$ 与 $A_{\mathrm{peak}}$ 之间跳变）**  

  这是数字电路中常见的波形（如TTL电平和PWM信号）。  
  
  其RMS值公式为：
  
  $$
  A_{\mathrm{RMS}} = A_{\mathrm{peak}} \times \sqrt{D}
  $$
  
- **特例：50%占空比**时，**与正弦波相同**。
    $$
    A_{\mathrm{RMS}} = A_{\mathrm{peak}}/\sqrt{2} = 0.707 \times A_{\mathrm{peak}}
    $$
- **特例：100%占空比**时，即为**直流信号**。
    $A_{\mathrm{RMS}} = A_{\mathrm{peak}}$

**情况二：双极性方波（在 $-A_{\mathrm{peak}}$ 与 $+A_{\mathrm{peak}}$ 之间跳变）** 

  这是交流耦合或差分信号中常见的波形。  
  
  由于其平方值始终为 $A_{\mathrm{peak}}^2$，因此**其RMS值恒等于峰值，与占空比无关**：
  
  $$
  A_{\mathrm{RMS}} = A_{\mathrm{peak}}
  $$

#### 波峰因数

**波峰因数 (Crest Factor)** 定义为峰值与RMS值的比值：

$$
\text{Crest Factor} = \frac{A_{\mathrm{peak}}}{A_{\mathrm{RMS}}}
$$

它描述了信号的“峰值程度”。波峰因数越高，意味着信号的瞬时功率远高于其平均功率，对放大器的峰值储备功率要求更高。

- **正弦波**：波峰因数 = $\sqrt{2} \approx 1.414$ ($3.01 \mathrm{dB}$)
- **50%占空比的单极性方波**：波峰因数 = $\sqrt{2} \approx 1.414$
- **双极性方波（任何占空比）**：波峰因数 = $1$ ($0 \mathrm{dB}$)
- **低占空比脉冲**：波峰因数很高（例如 $1\%$ 占空比的单极性方波，波峰因数为 $10$）。

**工程意义**：在音频领域，波峰因数高的信号（如交响乐）听起来动态范围大，但需要更大的系统净空（Headroom）来避免削波。RMS值用于衡量平均响度（如VU表），而峰值用于设置限幅器（Limiter）的阈值以防止失真。

**例题 4.2：** 一个正弦波在数字系统中的峰值达到 $-3 \,\mathrm{dBFS}$，求其 RMS 值的 dBFS。

**解：**

峰值 $-3 \,\mathrm{dBFS}$ 意味着 $20\log_{10}(A_{\mathrm{peak}}/A_{\max}) = -3$。

对于正弦波，$A_{\mathrm{RMS}} = A_{\mathrm{peak}} / \sqrt{2}$。

因此，

$$
\begin{aligned}
A_{\mathrm{RMS},\mathrm{dBFS}}
&= 20\log_{10}\!\left(\frac{A_{\mathrm{RMS}}}{A_{\max}}\right) \\[10pt]
&= 20\log_{10}\!\left(\frac{A_{\mathrm{peak}}}{A_{\max}} \times \frac{1}{\sqrt{2}}\right) \\[10pt]
&= 20\log_{10}\!\left(\frac{A_{\mathrm{peak}}}{A_{\max}}\right) + 20\log_{10}\!\left(\frac{1}{\sqrt{2}}\right) \\[10pt]
&= -3 - 3.01 \\[10pt]
&\approx -6.01 \,\mathrm{dBFS}.\\[10pt]
\end{aligned}
$$

### 4.3 LUFS（Loudness Units relative to Full Scale）

RMS 衡量能量，但人耳对不同频率的灵敏度不同（对中频最敏感）。LUFS 是一种更先进的响度度量，它基于 ITU-R BS.1770 标准：
1.  **频率加权**：使用一个特定的滤波器（K-weighting）来模拟人耳的频率响应。
2.  **通道求和**：对多声道信号（如立体声）的各通道能量进行加权求和。
3.  **门限与积分**：采用带有绝对门限的均方值计算，并在一段时间内积分，得到短期或综合响度。

**应用**：流媒体平台（如Spotify, YouTube, Netflix）使用 LUFS 进行响度归一化，确保不同内容的响度一致。常见目标响度约为 $-14 \,\mathrm{LUFS}$。

**LRA（Loudness Range）**：另一个相关参数，描述节目动态范围。

---

## 5. 电路中的分贝：电压增益、功率增益与运算放大器（Op-Amp）

### 5.1 功率增益与电压增益的再讨论

**功率增益（dB）：**

$$
G_{P,\mathrm{dB}} = 10 \log_{10}\!\left( \frac{P_{\mathrm{out}}}{P_{\mathrm{in}}} \right).
$$

这是最根本的增益定义。

**电压增益（dB）：**

$$
G_{V,\mathrm{dB}} = 20 \log_{10}\!\left( \frac{V_{\mathrm{out}}}{V_{\mathrm{in}}} \right).
$$

**重要前提：此公式仅在输入和输出阻抗 $R$ 相等的条件下，其计算结果才等于功率增益 $G_{P,\mathrm{dB}}$。**

**推导：** 若 $R_{in} = R_{out} = R$，则 $P_{in} = V_{in}^2 / R$，$P_{out} = V_{out}^2 / R$。

$$
\begin{aligned}
G_{P,\mathrm{dB}} &= 10 \log_{10}(P_{\mathrm{out}}/P_{\mathrm{in}}) \\[10pt]
&= 10 \log_{10}((V_{\mathrm{out}}^2/R) / (V_{\mathrm{in}}^2/R)) \\[10pt]
&= 10 \log_{10}((V_{\mathrm{out}}/V_{\mathrm{in}})^2) \\[10pt]
&= 20 \log_{10}(V_{\mathrm{out}}/V_{\mathrm{in}}) \\[10pt]
&= G_{V,\mathrm{dB}} \\[10pt]
\end{aligned}
$$

**如果阻抗不同**，必须通过功率计算增益。

**例题 5.1：** 一个放大器，输入 $V_{in}=1\mathrm{V}$ 到 $50\Omega$ 负载，输出 $V_{out}=10\mathrm{V}$ 到 $500\Omega$ 负载。求功率增益。

**解：**

$$
P_{in} = \frac{V_{in}^2}{R_{in}} \\[10pt]= \frac{1^2}{50} \\[10pt]= 0.02 \mathrm{W} \\[10pt]
$$

$$
P_{out} = \frac{V_{out}^2}{R_{out}} = \frac{10^2}{500} = 0.2 \mathrm{W}
$$

$$
\begin{aligned}
G_{P,\mathrm{dB}} 
&= 10 \log_{10}(\frac{0.2}{0.02}) \\[10pt]
&= 10 \log_{10}(10) \\[10pt]
&= 10 \mathrm{dB} \\[10pt]
\end{aligned}
$$

**注意：** 如果用电压比直接算 $20\log_{10}(10) = 20\mathrm{dB}$，结果是错误的。

### 5.2 运算放大器（Op-Amp）电路分析

运算放大器是构建放大、滤波、数学运算等电路的核心器件。在理想模型中，开环增益无穷大，输入阻抗无穷大，输出阻抗为零。

#### 5.2.1 反相放大器（Inverting Amplifier）

电路特点：输入信号通过电阻 $R_{in}$ 接入运放反相输入端（-）。

$$
A_v = -\frac{R_f}{R_{\mathrm{in}}}
$$

负号表示输出信号与输入信号反相 $180^\circ$。

电压增益（dB）为：

$$
\begin{aligned}
A_{v,\mathrm{dB}} 
&= 20\log_{10}\!\left|\frac{R_f}{R_{\mathrm{in}}}\right| \\[10pt]
&= 20\log_{10}(A_v) \quad (\text{因为取绝对值}) \\[10pt]
\end{aligned}
$$


**例题 5.2：** 反相放大器中，$R_{in} = 1\mathrm{k\Omega}$，$R_f = 10\mathrm{k\Omega}$，求 $A_v$ 和 $A_{v,\mathrm{dB}}$。

**解：**

$$
A_v = \frac{-10\mathrm{k\Omega}}{1\mathrm{k\Omega}} = -10
$$

$$
A_{v,\mathrm{dB}} = 20\log_{10}(10) = 20 \mathrm{dB}
$$

#### 5.2.2 同相放大器（Non-inverting Amplifier）

电路特点：输入信号接入运放同相输入端（+）。

$$
A_v = 1 + \frac{R_f}{R_g}
$$

输出信号与输入信号同相。

电压增益（dB）为：

$$
A_{v,\mathrm{dB}} = 20\log_{10}(A_v)
$$

**例题 5.3：** 同相放大器中，$R_g = 1\mathrm{k\Omega}$，$R_f = 9\mathrm{k\Omega}$，求 $A_v$ 和 $A_{v,\mathrm{dB}}$。

**解：**

$$
A_v = 1 + \frac{9\mathrm{k\Omega}}{1\mathrm{k\Omega}} = 10
$$

$$
A_{v,\mathrm{dB}} = 20\log_{10}(10) = 20 \mathrm{dB}
$$

#### 5.2.3 电压跟随器（Voltage Follower）

是同相放大器的特例，$R_f = 0$，$R_g \to \infty$（开路）。$A_v = 1$，$A_{v,\mathrm{dB}} = 0\mathrm{dB}$。用于阻抗匹配和缓冲。

### 5.3 增益-带宽积（Gain-Bandwidth Product, GBW）

实际运放的开环增益 $A_{OL}$ 随频率升高而下降。对于电压反馈型运放，存在一个近似常数：**增益-带宽积**。

$$
\mathrm{GBW} \approx A_{\mathrm{CL}} \times f_{\mathrm{BW}}
$$

其中：
- $A_{\mathrm{CL}}$ 是闭环增益（即电路设计的目标增益 $A_v$）。
- $f_{\mathrm{BW}}$ 是该闭环增益下的 $-3\mathrm{dB}$ 带宽。

**意义：** 增益和带宽是矛盾的。想要高增益，就必须牺牲带宽；想要宽带宽，增益就不能太高。

**例题 5.4：** 一个运放的 GBW 为 $1 \mathrm{MHz}$。用它构建一个 $A_v = 100$ ($40\mathrm{dB}$) 的同相放大器，求其带宽。

**解：**

$$f_{\mathrm{BW}} \approx \frac{\mathrm{GBW}}{A_{\mathrm{CL}}} = \frac{1\mathrm{MHz}}{100} = 10 \mathrm{kHz}$$

---

## 6. 电子工程与射频中的绝对分贝单位：$V_{\mathrm{RMS}}$ 详解、dBm、dBV、dBu

### 6.1 均方根电压（$V_{\mathrm{RMS}}$）的物理意义与计算

均方根（Root Mean Square, RMS）电压是交流电工程中最常用的电压度量，其物理意义是**等效直流值**，即该交流信号在一个固定阻抗 $R$ 上产生的平均功率与一个直流电压 $V_{\mathrm{DC}} = V_{\mathrm{RMS}}$ 在同一阻抗上产生的平均功率相等。

**连续信号的 $V_{\mathrm{RMS}}$ 定义：**
对周期信号 $x(t)$ 在周期 $T$ 上的 RMS 值定义为：

$$
V_{\mathrm{RMS}} = \sqrt{\frac{1}{T}\int_0^T [x(t)]^2\,\mathrm{d}t}
$$

**离散信号的 $V_{\mathrm{RMS}}$ 定义：**
对离散信号 $x[n]$ 在 $N$ 个采样点上的 RMS 值定义为：

$$
V_{\mathrm{RMS}} = \sqrt{\frac{1}{N}\sum_{n=1}^N x[n]^2}
$$

**功率关系：**
$V_{\mathrm{RMS}}$ 在功率计算中直接可用，平均功率为：

$$
P_{\mathrm{avg}} = \frac{V_{\mathrm{RMS}}^2}{R}
$$

**正弦波的 $V_{\mathrm{RMS}}$ 与峰值关系：**
对于纯正弦波 $v(t)=V_{\text{pk}}\sin(\omega t)$，RMS 与峰值（$V_{\text{pk}}$）的关系为：

$$
\begin{aligned}
&V_{\mathrm{RMS}} = \frac{V_{\text{pk}}}{\sqrt{2}} \quad\Longrightarrow\quad V_{\text{pk}} = \sqrt{2} \cdot V_{\mathrm{RMS}}
\end{aligned}
$$

**数值示例：**
- $1\,\mathrm{V_{RMS}}$ 的正弦波：峰值 $V_{\text{pk}} \approx 1.414\,\mathrm{V}$。
- $0.775\,\mathrm{V_{RMS}}$ 的正弦波：峰值 $V_{\text{pk}} \approx 1.095\,\mathrm{V}$。

**为什么工程与音频用 $RMS$？**
$RMS$ 与“发热/功率”直接相关，便于衡量能量与功率（测量仪器也通常给出 $RMS$ 值）。对于正弦波，$RMS$ 与峰值有固定倍数关系，便于统一描述。对于非正弦信号，必须用定义的积分/求和计算真 $RMS$（因此有“$True RMS$”万用表）。

### 6.2 dBm（以 $1\,\mathrm{mW}$ 为参考的功率）

$\mathrm{dBm}$ 是以 $1\,\mathrm{mW}$ 为参考功率的绝对分贝单位，广泛用于射频（RF）和微波工程：

$$
P_{\mathrm{dBm}} = 10 \log_{10}\!\left(\frac{P}{1\,\mathrm{mW}}\right).
$$

**注：**
在某些情况下，为避免歧义，分贝毫瓦单位，除了会写作dBm，还可能会写成dBmW。有些情况，会选择使用 dBmW 来强调参考基准就是“功率-毫瓦”，强调参考基准为1mW。

**例题 6.1：**

$$
P=1\,\mathrm{mW} \Rightarrow P_{\mathrm{dBm}}=10 \log_{10}(1)=0\,\mathrm{dBm}
$$

$$
P=10\,\mathrm{mW} \Rightarrow P_{\mathrm{dBm}}=10 \log_{10}(10) = 10\,\mathrm{dBm}
$$

$$
P=0.1\,\mathrm{mW} \Rightarrow P_{\mathrm{dBm}}=10 \log_{10}(0.1) = -10\,\mathrm{dBm}
$$

### 6.3 线路电平基准：dBV 与 dBu

这两种单位都以 $V_{\mathrm{RMS}}$ 为参考，用于表征音频和电子系统中的线路电平。

#### 6.3.1 dBV（以 $1\,\mathrm{V}_{\mathrm{RMS}}$ 为参考）

$\mathrm{dBV}$ 是以 $1\,\mathrm{V}_{\mathrm{RMS}}$ 为参考电压的绝对分贝单位，主要用于**消费级（非专业）音频设备**：

$$
V_{\mathrm{dBV}} = 20 \log_{10}\!\left(\frac{V}{1\,\mathrm{V}}\right)
$$

因此，$V = 1\,\mathrm{V_{RMS}} \implies V_{\mathrm{dBV}} = 0\,\mathrm{dBV}$。

#### 6.3.2 dBu（以 $0.775\,\mathrm{V}_{\mathrm{RMS}}$ 为参考）

$\mathrm{dBu}$ 是以 $0.775\,\mathrm{V}_{\mathrm{RMS}}$ 为参考电压的绝对分贝单位，主要用于**专业音频设备**。其历史渊源是为了在 $600\,\Omega$ 的标准阻抗下对应 $1\,\mathrm{mW}$ 的功率：

$$
V_{\mathrm{dBu}} = 20 \log_{10}\!\left(\frac{V}{0.775\,\mathrm{V}}\right)
$$

**历史推导（仅在 $600\,\Omega$ 系统下成立）：**

$$
\begin{aligned}
V_{0.775\mathrm{V}} 
&= \sqrt{P \cdot R} \\[10pt]
&= \sqrt{0.001\,\mathrm{W} \times 600\,\Omega} \\[10pt]
&\approx 0.7745967\,\mathrm{V} \\[10pt]
\end{aligned}
$$

因此，在 $600\,\Omega$ 系统下，$\mathbf{0\,\mathrm{dBu} \approx 0\,\mathrm{dBm}}$。

#### 6.3.3 dBV 与 dBu 相互转换

两者的参考值不同，可以通过固定关系进行转换：

$$
\begin{aligned}
\text{dBu} 
&= \text{dBV} + 20\log_{10}\!\left(\frac{1}{0.775}\right) \\[10pt]
&\approx \text{dBV} + 2.214\,\mathrm{dB} \\[10pt]
\end{aligned}
$$

等价地：

$$
\text{dBV} = \text{dBu} - 2.214\,\mathrm{dB}
$$

**例题 6.2：**

- $0\,\mathrm{dBV}$ 是多少 $\mathrm{dBu}$？ 
  $$
  \text{dBu} = 0 + 2.214 = +2.214\,\mathrm{dBu}
  $$
  
- $0\,\mathrm{dBu}$ 是多少 $\mathrm{dBV}$？ 
  $$
  \text{dBV} = 0 - 2.214 = -2.214\,\mathrm{dBV}
  $$
  
- 专业设备常见的线路电平是 $+4\,\mathrm{dBu}$，这相当于多少 $\mathrm{dBV}$ 和 $V_{\mathrm{RMS}}$？
  $$
  \text{dBV} = +4 - 2.214 = +1.786\,\mathrm{dBV}
  $$
  $$
  \begin{aligned}
  V_{\mathrm{RMS}} 
  &= 0.775 \times 10^{(4/20)} \\[10pt]
  &= 0.775 \times 10^{0.2} \\[10pt]
  &\approx 0.775 \times 1.5849 \\[10pt]
  &\approx 1.228\,\mathrm{V} \\[10pt]
  \end{aligned}
  $$
  
- 消费级设备常见的线路电平是 $-10\,\mathrm{dBV}$，这相当于多少 $\mathrm{dBu}$ 和 $V_{\mathrm{RMS}}$？
  $$
  \text{dBu} = -10 + 2.214 = -7.786\,\mathrm{dBu}
  $$
  $$
  \begin{aligned}
  V_{\mathrm{RMS}} 
  &= 1 \times 10^{(-10/20)} \\[10pt]
  &= 10^{-0.5} \\[10pt]
  &\approx 0.3162\,\mathrm{V} \\[10pt]
  \end{aligned}
  $$
  
### 6.4 其他电压类的 $\mathrm{dB}$ 单位

- $\mathrm{dBmV}$（相对于 $1\,\mathrm{mV}$）：
  $$
  V_{\mathrm{dBmV}} = 20 \log_{10}\!\left(\frac{V}{1\,\mathrm{mV}}\right).
  $$
  常用于电视和有线电视系统（$75\Omega$ 系统）。

- $\mathrm{dB\mu V}$（相对于 $1\,\mu\mathrm{V}$）：
  $$
  V_{\mathrm{dB\mu V}} = 20 \log_{10}\!\left(\frac{V}{1\,\mu\mathrm{V}}\right).
  $$
  常用于描述非常弱的信号，如天线接收灵敏度。

### 6.5 dBm 与电压之间的换算（任意阻抗 $R$）

功率与电压关系（RMS）：

$$
P = \frac{V_{\mathrm{rms}}^2}{R}.
$$

代入 dBm 定义得到：

$$
\begin{aligned}
P_{\mathrm{dBm}} &= 10\log_{10}\!\left(\frac{V^2}{R \cdot 1\,\mathrm{mW}}\right) \\
&= 20\log_{10}(V) - 10\log_{10}(R) + 10\log_{10}(1000) \quad (\text{因为 } 1\mathrm{mW}=10^{-3}\mathrm{W}, \text{而 } 1\mathrm{W} \text{是参考}) \\
&= 20\log_{10}(V) - 10\log_{10}(R) + 30
\end{aligned}
$$

其中 $V$ 单位为伏特、$R$ 单位为欧姆。

**常见特例：**

- 在 $50\,\Omega$ 系统（射频标准）中：
  $$
  \begin{aligned}
  P_{\mathrm{dBm}} 
  &= 20\log_{10}(V) - 10\log_{10}(50) + 30 \\[10pt]
  &= 20\log_{10}(V) - 16.99 + 30 \approx 20\log_{10}(V) + 13.01 \\[10pt]
  \end{aligned}
  $$
- 在 $75\,\Omega$ 系统（电视标准）中：
  $$
  \begin{aligned}
  P_{\mathrm{dBm}} 
  &= 20\log_{10}(V) - 10\log_{10}(75) + 30 \\[10pt]
  &= 20\log_{10}(V) - 18.75 + 30 \\[10pt]
  &\approx 20\log_{10}(V) + 11.25 \\[10pt]
  \end{aligned}
  $$
- 在 $600\,\Omega$ 系统（传统音频标准）中：
  $$
  \begin{aligned}
  P_{\mathrm{dBm}} 
  &= 20\log_{10}(V) - 10\log_{10}(600) + 30 \\[10pt]
  &= 20\log_{10}(V) - 27.78 + 30 \\[10pt]
  &\approx 20\log_{10}(V) + 2.22 \\[10pt]
  \end{aligned}
  $$
  
注意，当 $V=0.775\mathrm{V}$ 时，

$$
\begin{aligned}
P_{\mathrm{dBm}} 
&\approx 20\log_{10}(0.775) + 2.22 \\[10pt]
&\approx -2.22 + 2.22 = 0\mathrm{dBm} \\[10pt]
\end{aligned}
$$

与定义一致。

**例题 6.3：** 在 $50\Omega$ 系统中，测得正弦波信号 $V_{\mathrm{RMS}} = 1\mathrm{V}$，求功率 $P_{\mathrm{dBm}}$。

**解：**

$$
\begin{aligned}
P_{\mathrm{dBm}} 
&\approx 20\log_{10}(1) + 13.01 \\[10pt]
&= 0 + 13.01 \\[10pt]
&= +13.01\,\mathrm{dBm} \\[10pt]
\end{aligned}
$$

或用功率直接算：

$$
P = V^2/R = 1/50 = 0.02\mathrm{W} = 20\mathrm{mW}
$$

$$
P_{\mathrm{dBm}} = 10\log_{10}(20) \approx 13.01\mathrm{dBm}
$$

### 6.6 $\mathrm{dBV}$、$\mathrm{dBu}$、$\mathrm{dBm}$ 快速换算表

下表总结了常用的音频和 RF 电平，并给出了其对应的 RMS 电压值。假设正弦波。

| 单位                                | 参考值                 | 对应的 $V_{\mathrm{RMS}}$ | 对应的 $V_{\text{pk}}$ (正弦波) | $600\Omega$ 下 $P_{\mathrm{dBm}}$ | $50\Omega$ 下 $P_{\mathrm{dBm}}$ | 典型应用      |
| :-------------------------------- | :------------------ | :--------------------- | :------------------------ | :------------------------------- | :------------------------------ | :-------- |
| $\mathbf{0\,\mathrm{dBV}}$        | $1.000\,\mathrm{V}$ | $1.000\,\mathrm{V}$    | $1.414\,\mathrm{V}$       | $+2.22\,\mathrm{dBm}$            | $+13.01\,\mathrm{dBm}$          | 消费级数字设备参考 |
| $\mathbf{0\,\mathrm{dBu}}$        | $0.775\,\mathrm{V}$ | $0.775\,\mathrm{V}$    | $1.096\,\mathrm{V}$       | $\mathbf{0\,\mathrm{dBm}}$       | $+10.79\,\mathrm{dBm}$          | 专业音频参考    |
| $\mathbf{+4\,\mathrm{dBu}}$       | $0.775\,\mathrm{V}$ | $1.228\,\mathrm{V}$    | $1.737\,\mathrm{V}$       | $+4\,\mathrm{dBm}$               | $+14.79\,\mathrm{dBm}$          | 专业音频线路标准  |
| $\mathbf{-10\,\mathrm{dBV}}$      | $1.000\,\mathrm{V}$ | $0.316\,\mathrm{V}$    | $0.447\,\mathrm{V}$       | $-7.78\,\mathrm{dBm}$            | $+3.01\,\mathrm{dBm}$           | 消费级线路标准   |
| $\mathbf{0\,\mathrm{dBm}}$ (600Ω) | $1\,\mathrm{mW}$    | $0.775\,\mathrm{V}$    | $1.096\,\mathrm{V}$       | $0\,\mathrm{dBm}$                | $+10.79\,\mathrm{dBm}$          | 传统电话/音频功率 |
| $\mathbf{0\,\mathrm{dBm}}$ (50Ω)  | $1\,\mathrm{mW}$    | $0.224\,\mathrm{V}$    | $0.316\,\mathrm{V}$       | $-10.79\,\mathrm{dBm}$           | $0\,\mathrm{dBm}$               | 射频系统功率    |

**重要提示：** 上表中 $P_{\mathrm{dBm}}$ 在不同阻抗下的差异巨大，这强调了**在提及 dBm 时，明确或隐含阻抗条件至关重要**。

### 6.7 天线增益：dBi 与 dBd

天线增益描述的是天线将能量集中辐射到特定方向的能力。

- $\mathrm{dBi}$：增益相对于一个**理想各向同性天线（Isotropic Antenna）**。各向同性天线是一个理论点源，在所有方向上均匀辐射。dBi 是工程中最常用的天线增益单位。
  
- $\mathrm{dBd}$：增益相对于一个**半波偶极子天线（Half-wave Dipole Antenna）**。偶极子天线是实际中常用的参考天线，它本身具有一定的方向性。

**换算关系：**

一个理想的半波偶极子天线相对于各向同性天线的增益约为 $2.15 \mathrm{dBi}$。

因此：

$$
\text{Gain (dBi)} = \text{Gain (dBd)} + 2.15\,\mathrm{dB}
$$

**例题 6.4：** 一个天线的增益标称为 $5\,\mathrm{dBd}$，求其以 dBi 表示的增益。

**解：**

$\text{Gain (dBi)} = 5 + 2.15 = 7.15\,\mathrm{dBi}$

---

## 7. 链路预算中的 EIRP 与接收功率

链路预算是无线通信系统设计中的重要环节，用于计算从发射机到接收机的信号功率。

### 7.1 有效全向辐射功率（EIRP）

EIRP 表示天线在最大辐射方向上辐射的等效功率，假设天线是无损且各向同性的。

$$
\mathrm{EIRP(dBm)} = P_{\mathrm{tx}}(\mathrm{dBm}) + G_{\mathrm{tx}}(\mathrm{dBi}) - L_{\mathrm{feed}}(\mathrm{dB})
$$

其中：
- $P_{\mathrm{tx}}$：发射机输出功率（dBm）
- $G_{\mathrm{tx}}$：发射天线增益（dBi）
- $L_{\mathrm{feed}}$：从发射机到天线之间的馈线（电缆）、连接器等的损耗（dB）

**例题 7.1：** 发射机输出 $30\mathrm{dBm}$ ($1\mathrm{W}$)，天线增益 $10\mathrm{dBi}$，馈线损耗 $2\mathrm{dB}$。求 EIRP。

**解：**

$$
\mathrm{EIRP} = 30 + 10 - 2 = 38\mathrm{dBm}
$$

### 7.2 自由空间路径损耗（FSPL）

电磁波在自由空间中传播时，能量会随着距离增加而扩散，导致功率衰减。

$$
\mathrm{FSPL(dB)} = 20\log_{10}\!\left(\frac{4\pi d f}{c}\right)
$$

其中：
- $d$：距离（米）
- $f$：频率（赫兹）
- $c$：光速（$3\times10^8 \mathrm{m/s}$）

更常用的形式是：

$$
\mathrm{FSPL(dB)} = 20\log_{10}(d) + 20\log_{10}(f) + 20\log_{10}\!\left(\frac{4\pi}{c}\right)
$$

计算常数项：

$$
20\log_{10}\left( \frac{4\pi}{c} \right) \approx 20\log_{10}(4.1888\times10^{-8}) \approx -147.55
$$

因此：

$$
\mathrm{FSPL(dB)} = 20\log_{10}(d) + 20\log_{10}(f) - 147.55
$$

如果 $d$ 用公里（km），$f$ 用兆赫（MHz）：

$$
\mathrm{FSPL(dB)} = 20\log_{10}(d_{\mathrm{km}}) + 20\log_{10}(f_{\mathrm{MHz}}) + 32.44
$$

**例题 7.2：** 计算 $2.4\mathrm{GHz}$ 信号在 $100\mathrm{m}$ 距离上的自由空间路径损耗。

**解：**

$$
d=100\mathrm{m}
$$

$$
f=2.4\times10^9\mathrm{Hz}
$$

$$
\begin{aligned}
\mathrm{FSPL} 
&= 20\log_{10}(100) + 20\log_{10}(2.4\times10^9) - 147.55 \\[10pt]
&= 40 + 187.6 - 147.55 \approx 80.05\mathrm{dB} \\[10pt]
\end{aligned}
$$

### 7.3 接收功率计算

接收机天线处收到的功率 $P_{\mathrm{rx}}$ 可以估算为：

$$
P_{\mathrm{rx}}(\mathrm{dBm}) = \mathrm{EIRP(dBm)} - \mathrm{FSPL(dB)} + G_{\mathrm{rx}}(\mathrm{dBi}) - L_{\mathrm{feed,rx}}(\mathrm{dB})
$$

其中 $G_{\mathrm{rx}}$ 是接收天线增益，$L_{\mathrm{feed,rx}}$ 是接收端馈线损耗。

---

## 8. 小结与实务要点

1.  **统一原则**：分贝始终表示比值。核心口诀：**功率用10log，幅度用20log**。
   
2.  **参考值至关重要**：$\mathrm{dBm}$、$\mathrm{dBV}$、$\mathrm{dBu}$、$\mathrm{dBmV}$、$\mathrm{dB\mu V}$ 等都包含特定的参考值。在进行单位转换或计算时，必须明确阻抗与参考基准。
   
3.  **区分峰值与RMS**：峰值用于防止削波，RMS（或LUFS）用于衡量平均能量或响度。
   
4.  **音频工程实践**：
    - 在数字域使用 $\mathrm{dBFS}$ 管理峰值，确保不超 $0\mathrm{dBFS}$。
    - 使用 $\mathrm{LUFS}$ 管理主观响度，以满足流媒体平台的响度归一化要求。
    - 最终输出前应进行峰值限制（Limiter）与响度归一化（Loudness Normalization）。
      
5.  **射频实践**：
    - 链路预算中功率以 $\mathrm{dBm}$ 表示、天线以 $\mathrm{dBi}$ 表示。
    - $\mathrm{EIRP}$ 是衡量系统发射能力的关键指标，受法规限制。
    - 路径损耗是无线系统设计的主要限制因素之一。
      
6.  **电路设计注意**：
    - 电压增益分贝 $20\log_{10}(V_{out}/V_{in})$ 仅在输入输出阻抗相等时才等于功率增益分贝。
    - 运算放大器的增益和带宽是矛盾的，受增益-带宽积（GBW）限制。

---

这份文档旨在成为电子工程、音频工程和通信工程领域学习者关于分贝体系的学习笔记与复习指南。它从最基础的数学概念开始，逐步深入到各个应用场景，并辅以大量的例题和速查表，力求使零基础的学习者也能完全掌握。

---

## 结语

<div>
欢迎访问我的个人网页！<br>
<a href="https://wuhanqing2005.github.io">wuhanqing2005.github.io</a><br>
<a href="https://wuhanqing.cn">wuhanqing.cn</a><br><br>
下载原文Markdown: <a href="https://wuhanqing2005.github.io/zh-CN/blogs/In-Depth Analysis of the Decibel System.md">In-Depth Analysis of the Decibel System.md</a><br>
下载原文PDF: <a href="https://wuhanqing2005.github.io/zh-CN/blogs/In-Depth Analysis of the Decibel System.pdf">In-Depth Analysis of the Decibel System.pdf</a><br><br>
欢迎关注我的微信公众号: @<span style="text-decoration: underline;">Daniel的多线程日记</span>
</div>
