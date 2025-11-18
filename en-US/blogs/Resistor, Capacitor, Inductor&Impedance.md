# 电阻、电容、电感与阻抗

<div style="display:flex; justify-content:space-between; font-weight:600;">
  <span>作者: Daniel_清寒</span>
  <span>时间: 2025-11-18</span>
</div>

---

## 引言

本文系统阐述了电阻、电容与电感在交流电路中的阻抗特性及其物理意义。 通过相量法与频率域分析，分别推导了三种元件的阻抗公式， 揭示了电压、电流之间的相位关系与能量变化规律。 文中还对比总结了电阻、容抗与感抗的数学表达式及频率特性， 帮助读者直观理解“通交隔直”“通直阻交”等经典规律， 为后续的滤波器、电路谐振与交流分析等应用奠定理论基础。

---

## 1. 阻抗的基本概念

### 1.1 定义

**阻抗**是电路元件在交流电路中对抗电流流动能力的总称。它是电阻（消耗能量）和电抗（储存和释放能量）的复数表示。

### 1.2 数学表示

阻抗 $Z$ 是一个复数：

$$
Z = R + jX
$$

其中：
- $R$ 是**电阻分量**（实部），代表能量的耗散
- $X$ 是**电抗分量**（虚部），代表能量的储存与释放
- $j$ 是虚数单位（在电子学中常用 $j$ 代替 $i$）

### 1.3 阻抗的模和相位

阻抗的大小（模）和相位角为：

$$
|Z| = \sqrt{R^2 + X^2}
$$

$$
\theta = \arctan\left(\frac{X}{R}\right)
$$

---

## 2. 电阻的阻抗

### 2.1 时域特性

电阻的电压和电流在任意时刻都遵循欧姆定律：

$$
v_R(t) = R \cdot i_R(t)
$$

### 2.2 阻抗推导

假设通过电阻的电流为正弦波：

$$
i_R(t) = I_m \sin(\omega t)
$$

根据欧姆定律，电阻两端电压为：

$$
v_R(t) = R \cdot i_R(t) = R \cdot I_m \sin(\omega t)
$$

使用相量法分析，电流相量为 $\mathbf{I}$，电压相量为 $\mathbf{V}_R$：

$$
\mathbf{V}_R = R \cdot \mathbf{I}
$$

因此，电阻的阻抗为：

$$
Z_R = \frac{\mathbf{V}_R}{\mathbf{I}} = R
$$

### 2.3 结论

**电阻的阻抗是一个纯实数：**

$$
\boxed{Z_R = R}
$$

**特性：**
- 只有电阻分量，没有电抗分量
- 阻抗与频率无关
- 电压与电流同相位

---

## 3. 电容的阻抗

### 3.1 时域特性

电容器的基本特性方程为：

$$
v_C(t) = \frac{1}{C} q(t) = \frac{1}{C} \int i_C(t)  dt
$$

$$
i_C(t) = C \frac{dv_C(t)}{dt}
$$

### 3.2 阻抗推导

假设电容器两端电压为正弦波：

$$
v_C(t) = V_m \sin(\omega t)
$$

流过电容的电流为：

$$
\begin{aligned}
i_C(t)
&= C \cdot \frac{d}{dt}\left[V_m \sin(\omega t)\right] \\[10pt]
&= C \cdot V_m \omega \cos(\omega t) \\[10pt]
&= \omega C \cdot V_m \cdot \sin(\omega t + 90^\circ)\\[10pt]
\end{aligned}
$$

使用相量法推导，设电压相量为 $\mathbf{V}_C$：

$$
v_C(t) = \mathbf{V}_C e^{j\omega t}
$$

$$
\begin{aligned}
i_C(t) 
&= C \frac{d}{dt} (\mathbf{V}_C e^{j\omega t}) \\[10pt]
&= C \cdot \mathbf{V}_C \cdot j\omega e^{j\omega t} \\[10pt]
&= (j\omega C) \mathbf{V}_C e^{j\omega t}\\[10pt]
\end{aligned}
$$

电流相量为：

$$
\mathbf{I} = j\omega C \mathbf{V}_C
$$

因此，电容的阻抗为：

$$
Z_C = \frac{\mathbf{V}_C}{\mathbf{I}} = \frac{\mathbf{V}_C}{j\omega C \mathbf{V}_C} = \frac{1}{j\omega C}
$$

利用 $\frac{1}{j} = -j$，可得：

$$
Z_C = -j \frac{1}{\omega C}
$$

### 3.3 结论

**电容的阻抗是一个纯虚数：**

$$
\boxed{Z_C = \frac{1}{j\omega C} = -j \frac{1}{\omega C}}
$$

**特性：**
- **容抗**大小为 $X_C = \frac{1}{\omega C}$
- 阻抗与频率 $\omega$ 成**反比**
- 频率越高，阻抗越小（高频信号易通过）
- 频率越低，阻抗越大（低频信号难通过）
- 直流时（$\omega = 0$），阻抗为无穷大（开路）
- 电流相位**超前**电压相位 $90^\circ$

---

## 4. 电感的阻抗

### 4.1 时域特性

电感器的基本特性方程为：

$$
v_L(t) = L \frac{di_L(t)}{dt}
$$

### 4.2 阻抗推导

假设流过电感的电流为正弦波：

$$
i_L(t) = I_m \sin(\omega t)
$$

电感两端电压为：

$$
\begin{aligned}
v_L(t) 
&= L \frac{d}{dt} \left[ I_m \sin(\omega t) \right] \\[10pt]
&= L \cdot I_m \cdot \omega \cos(\omega t) \\[10pt]
&= \omega L I_m \sin(\omega t + 90^\circ) \\[10pt]
\end{aligned}
$$

使用相量法推导，设电流相量为 $\mathbf{I}$：

$$
i_L(t) = \mathbf{I} e^{j\omega t}
$$

$$
\begin{aligned}
v_L(t) 
&= L \frac{d}{dt} (\mathbf{I} e^{j\omega t}) \\[10pt]
&= L \cdot \mathbf{I} \cdot j\omega e^{j\omega t} \\[10pt]
&= (j\omega L) \mathbf{I} e^{j\omega t} \\[10pt]
\end{aligned}
$$

电压相量为：

$$
\mathbf{V}_L = j\omega L \mathbf{I}
$$

因此，电感的阻抗为：

$$
Z_L = \frac{\mathbf{V}_L}{\mathbf{I}} = \frac{j\omega L \mathbf{I}}{\mathbf{I}} = j\omega L
$$

### 4.3 结论

**电感的阻抗是一个纯虚数：**

$$
\boxed{Z_L = j\omega L}
$$

**特性：**
- **感抗**大小为 $X_L = \omega L$
- 阻抗与频率 $\omega$ 成**正比**
- 频率越高，阻抗越大（高频信号难通过）
- 频率越低，阻抗越小（低频信号易通过）
- 直流时（$\omega = 0$），阻抗为零（短路）
- 电压相位**超前**电流相位 $90^\circ$

---

## 5. 总结对比

### 5.1 三种元件的阻抗特性

| 元件 | 阻抗 $Z$ | 电抗 $X$ | 电压-电流相位关系 | 频率特性 |
|------|-----------|-----------|-------------------|-----------|
| **电阻** | $Z_R = R$ | $X_R = 0$ | **同相** | 与频率无关 |
| **电容** | $Z_C = \dfrac{1}{j\omega C}$ | $X_C = \dfrac{1}{\omega C}$ | **电流超前电压** $90^\circ$ | $f \uparrow, Z \downarrow$ |
| **电感** | $Z_L = j\omega L$ | $X_L = \omega L$ | **电压超前电流** $90^\circ$ | $f \uparrow, Z \uparrow$ |

### 5.2 记忆口诀

- **电容**：**"通交隔直"**（通过交流，隔断直流），**"电流领先"**
- **电感**：**"通直阻交"**（通过直流，阻碍交流），**"电压领先"**

### 5.3 应用意义

这些基本阻抗公式是分析所有交流电路和滤波器设计的基石。通过将它们代入电路定律（欧姆定律、基尔霍夫定律）的复数形式，可以系统性地分析复杂电路的频率响应、相位特性和稳定性。

在滤波器设计中：
- 电容常用于**旁路高频信号**
- 电感常用于**阻挡高频信号**
- 电阻用于**控制增益**和**匹配阻抗**

这些特性使得我们能够设计出满足特定频率响应要求的各种滤波器电路。

---

## 结语

<div>
欢迎访问我的个人网页！<br>
<a href="https://wuhanqing2005.github.io">wuhanqing2005.github.io</a><br>
<a href="https://wuhanqing.cn">wuhanqing.cn</a><br><br>
下载原文Markdown: <a href="https://wuhanqing2005.github.io/zh-CN/blogs/Resistor, Capacitor, Inductor&Impedance.md">Resistor, Capacitor, Inductor&Impedance.md</a><br>
下载原文PDF: <a href="https://wuhanqing2005.github.io/zh-CN/blogs/Resistor, Capacitor, Inductor&Impedance.pdf">Resistor, Capacitor, Inductor&Impedance.pdf</a><br><br>
欢迎关注我的微信公众号: @<span style="text-decoration: underline;">Daniel的多线程日记</span>
</div>
