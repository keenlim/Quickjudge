'use client';

import React, { useEffect, useState } from 'react';
import { Minus, Plus, RotateCcw, Save, FileText } from 'lucide-react';
import { otherDeductions } from '@/data/deductionCodes_2024';

const YEAR_OPTIONS = [
  {
    name: '📅 2024 规则 (2024 Rules)',
    value: '2024'
  },
  {
    name: '📅 2005 规则 (2005 Rules)',
    value: '2005'
  }
]

const ROUTINE_OPTIONS = [
  {
    name: '🥋 竞赛长拳 (1st intl ChangQuan)',
    value: '1st_intl_Changquan'
  },
  {
    name: '🥋 竞赛剑术 (1st intl Jian)',
    value: '1st_intl_Jian'
  },
  {
    name: '🥋 竞赛刀术 (1st intl Dao)',
    value: '1st_intl_Dao'
  },
  {
    name: '🥋 竞赛枪术 (1st intl Qiang/Spear)',
    value: '1st_intl_Qiang'
  },
  {
    name: '🥋 竞赛棍术 (1st intl Cudgel)',
    value: '1st_intl_Gun'
  },
  {
    name: '🥋 初级长拳 (Elementary ChangQuan)',
    value: '3_duan_Changquan'
  },
  {
    name: '🥋 初级剑术 (Elementary Jian)',
    value: '4_duan_Jian'
  },
  {
    name: '🥋 初级刀术 (Elementary Dao)',
    value: '4_duan_Dao'
  },
  {
    name: '🥋 初级枪术 (Elementary Qiang)',
    value: '4_duan_Qiang'
  },
  {
    name: '🥋 初级棍术 (Elementary Cudgel)',
    value: '4_duan_Gun'
  },
]

export const WushuScoringApp = () => {

  const [athleteName, setAthleteName] = useState('');
  const [deductions, setDeductions] = useState([]);
  const [movements, setMovements] = useState([])
  const [currentMovement, setCurrentMovement] = useState(0);
  const [routineTime, setRoutineTime] = useState('');
  const [performanceScore, setPerformanceScore] = useState(3.0);

  const [routineType, setRoutineType] = useState('1st_intl_Changquan');
  const [rulesYear, setRulesYear] = useState('2024');
  const [loading, setLoading] = useState(false);

  const loadMovements = async (year, type) => {
    setLoading(true);

    try {
      const fileName = `${type}.json`;
      const filePath = `/data/routines/${year}/${fileName}`;

      const response = await fetch(filePath);
      if(!response.ok) {
        throw new Error(`File not found: ${fileName}`);
      }

      const data = await response.json();
      setMovements(data.movements);
      setCurrentMovement(0);
      setDeductions([]);
    } catch (error) {
      console.error('Error loading movements: ', error);
      alert(`无法加载套路数据 (Could not load routine data): ${error.message}`);
      setMovements([]);
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovements(rulesYear, routineType);
  }, [rulesYear, routineType]);

  const baseQualityScore = 7.0; // Compulsory routines have 7.0 for Quality

  const addDeduction = (movementId, movementName, category, categoryValue, note = '') => {
    const newDeduction = {
      id: Date.now(),
      movementId,
      movementName,
      category,
      value: categoryValue,
      note,
      timestamp: new Date().toLocaleTimeString()
    };
    setDeductions([...deductions, newDeduction]);
  };

  const removeDeduction = (id) => {
    setDeductions(deductions.filter(d => d.id !== id));
  };

  const calculateTimeDeduction = () => {
    if (!routineTime) return 0;
    const time = parseFloat(routineTime);
    
    // Time requirement: 1:10 - 1:25 for junior divisions (70-85 seconds)
    const minTime = 70;
    const maxTime = 85;
    
    if (time < minTime) {
      const underTime = minTime - time;
      if (underTime <= 2) return 0.1;
      if (underTime <= 4) return 0.2;
      return Math.ceil(underTime / 2) * 0.1;
    } else if (time > maxTime) {
      const overTime = time - maxTime;
      if (overTime <= 2) return 0.1;
      if (overTime <= 4) return 0.2;
      return Math.ceil(overTime / 2) * 0.1;
    }
    return 0;
  };

  const totalDeductions = deductions.reduce((sum, d) => sum + d.value, 0);
  const timeDeduction = calculateTimeDeduction();
  const qualityScore = Math.max(0, baseQualityScore - totalDeductions);
  const finalScore = qualityScore + performanceScore - timeDeduction;

  const resetAll = () => {
    if (confirm('确定要重置所有数据吗？ (Reset all data?)')) {
      setDeductions([]);
      setCurrentMovement(0);
      setRoutineTime('');
      setPerformanceScore(3.0);
      setAthleteName('');
    }
  };

  const generateReport = () => {
    const report = {
      athleteName,
      routineTime,
      baseQualityScore,
      totalDeductions,
      qualityScore,
      performanceScore,
      timeDeduction,
      finalScore,
      deductions: deductions.map(d => ({
        movement: d.movementName,
        category: d.category,
        value: d.value,
        note: d.note
      }))
    };
    
    const reportText = `
=== 武术计分报告 (Wushu Scoring Report) ===
运动员 (Athlete): ${athleteName || '未填写'}
套路时间 (Routine Time): ${routineTime || '未记录'} 秒

=== 评分详情 (Scoring Details) ===
动作质量基础分 (Base Quality Score): ${baseQualityScore.toFixed(2)}
总扣分 (Total Deductions): -${totalDeductions.toFixed(2)}
动作质量得分 (Quality Score): ${qualityScore.toFixed(2)}

演练水平分 (Performance Score): ${performanceScore.toFixed(2)}
时间扣分 (Time Deduction): -${timeDeduction.toFixed(2)}

最终得分 (Final Score): ${finalScore.toFixed(3)}

=== 扣分明细 (Deduction Details) ===
${deductions.map((d, i) => `
${i + 1}. 动作 (Movement): ${d.movementName}
   类别 (Category): ${d.category}
   扣分 (Deduction): -${d.value.toFixed(2)}
   备注 (Note): ${d.note || '无'}
   时间 (Time): ${d.timestamp}
`).join('\n')}

生成时间: ${new Date().toLocaleString()}
    `.trim();
    
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wushu-score-${athleteName || 'report'}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset current movement and deductions when switching routines
  const handleRoutineChange = (type) => {
    setRoutineType(type);
    setCurrentMovement(0);
    setDeductions([]); // Clear deductions when switching
  };

  const handleYearChange = (year) => {
    setRulesYear(year);
    setCurrentMovement(0);
    setDeductions([]); // Clear deductions when switching
  };

  if (loading === true) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const getRoutineHeader = (type) => {
    const item = ROUTINE_OPTIONS.find(option => option.value === type);
    return item ? item.name : null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 p-2 md:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 md:p-6 rounded-t-2xl shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-center">武术计分系统</h1>
          <h2 className="text-lg md:text-xl text-center mt-2">Wushu Scoring System</h2>
          <p className="text-center mt-2 text-red-100 text-xs md:text-base">{getRoutineHeader(routineType)} - 规定套路 (Compulsory Routine) - {rulesYear} 规则</p>
        </div>

        {/* Athlete Info */}
        <div className="bg-white p-4 md:p-6 shadow-lg">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                运动员姓名 (Athlete Name)
              </label>
              <input
                type="text"
                value={athleteName}
                onChange={(e) => setAthleteName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-base min-h-[44px]"
                placeholder="输入姓名 (Enter name)"
                style={{ fontSize: '16px' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                套路时间 (Routine Time) - 秒 (seconds)
              </label>
              <input
                type="number"
                value={routineTime}
                onChange={(e) => setRoutineTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-base min-h-[44px]"
                placeholder="70-85秒"
                step="0.1"
                style={{ fontSize: '16px' }}
              />
              <p className="text-xs text-gray-500 mt-1">
                要求: 1:10-1:25 (70-85秒) | 时间扣分: {timeDeduction > 0 ? `-${timeDeduction.toFixed(2)}` : '0.00'}
              </p>
            </div>
          </div>
        </div>

        {/* Routine Selection */}
        <div className="bg-white p-4 md:p-6 shadow-lg border-t-4 border-red-500">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            选择套路和规则 (Select Routine & Rules)
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                套路类型 (Routine Type)
              </label>
              <select
                value={routineType}
                onChange={(e) => handleRoutineChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900 font-medium text-base md:text-lg shadow-sm hover:border-red-400 transition-colors min-h-[44px]"
                style={{ fontSize: '16px',  minHeight: '48px' }}
              >
                {ROUTINE_OPTIONS.map((routine) => {
                  return (
                    <option key={routine.value} value={routine.value}>{routine.name}</option>
                  )
                })}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                规则年份 (Rules Year)
              </label>
              <select
                value={rulesYear}
                onChange={(e) => handleYearChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900 font-medium text-base md:text-lg shadow-sm hover:border-red-400 transition-colors min-h-[44px]"
                style={{ fontSize: '16px',  minHeight: '48px' }}
              >
                {YEAR_OPTIONS.map((year) => {
                  return (
                    <option key={year.value} value={year.value}>{year.name}</option>
                  )
                })}
              </select>
            </div>
          </div>
          
          {/* Info Alert */}
          <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-sm text-yellow-800">
              ⚠️ 切换套路或规则将清空当前扣分记录 (Switching routine or rules will clear current deductions)
            </p>
          </div>
        </div>

        {/* Score Summary */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 md:p-6 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">动作质量分</div>
              <div className="text-sm text-gray-600 mb-1">(Quality)</div>
              <div className="text-2xl font-bold text-blue-600">{qualityScore.toFixed(2)}</div>
              <div className="text-xs text-gray-500">/ 7.00</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">演练水平分</div>
              <div className="text-sm text-gray-600 mb-1">(Performance)</div>
              <div className="text-2xl font-bold text-green-600">
                <input
                  type="number"
                  value={performanceScore}
                  onChange={(e) => setPerformanceScore(parseFloat(e.target.value) || 0)}
                  className="w-24 md:w-20 text-center border-2 border-gray-300 rounded px-2 py-1 text-xl md:text-2xl min-h-[44px]"
                  step="0.01"
                  min="0"
                  max="3"
                  style={{ fontSize: '16px' }}
                />
              </div>
              <div className="text-xs text-gray-500">/ 3.00</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">总扣分</div>
              <div className="text-sm text-gray-600 mb-1">(Deductions)</div>
              <div className="text-2xl font-bold text-red-600">-{totalDeductions.toFixed(2)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">时间扣分</div>
              <div className="text-sm text-gray-600 mb-1">(Time)</div>
              <div className="text-2xl font-bold text-orange-600">-{timeDeduction.toFixed(2)}</div>
            </div>
            <div className="text-center bg-white rounded-lg p-2 shadow">
              <div className="text-sm text-gray-600">最终得分</div>
              <div className="text-sm text-gray-600 mb-1">(Final Score)</div>
              <div className="text-3xl font-bold text-red-700">{finalScore.toFixed(3)}</div>
              <div className="text-xs text-gray-500">/ 10.00</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {/* Deduction Entry */}
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-red-500 pb-2">
              当前动作扣分 (Current Movement Deductions)
            </h3>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-gray-800">
                {movements && movements[currentMovement]?.name || '请选择动作'}
              </div>
              {movements && movements[currentMovement]?.techniques.length > 0 && (
                <div className="text-sm text-gray-600 mt-2">
                  技术要点扣分代码 (Deduction Codes):
                  {movements && movements[currentMovement].techniques.map((tech, i) => (
                    <span key={i} className="block mt-1 font-medium text-red-600">
                      • {tech.name} - 代码 {tech.code} (扣0.1分)
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Buttons - Fixed at top for easy clicking */}
            <div className="sticky top-0 z-10 flex gap-2 mb-4 p-3 md:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200 shadow-lg">
              <button
                onClick={() => setCurrentMovement(Math.max(0, currentMovement - 1))}
                disabled={currentMovement === 0}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors shadow-md text-sm md:text-base min-h-[44px]"
              >
                ← 上一个动作
              </button>
              <button
                onClick={() => setCurrentMovement(Math.min((movements?.length || 1) - 1, currentMovement + 1))}
                disabled={currentMovement === (movements?.length || 1) - 1}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors shadow-md text-sm md:text-base min-h-[44px]"
              >
                下一个动作 →
              </button>
            </div>

            {/* Scrollable Deductions List */}
            <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2 pb-4">
              {/* Technique-specific deductions */}
              {movements && movements[currentMovement]?.techniques.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 text-lg">技术扣分 (Technique Deductions)</h4>
                  <div className="space-y-2">
                    {movements[currentMovement].techniques.map((tech, index) => {
                      return (
                        <div key={index} className="border-2 border-red-200 rounded-lg p-3 bg-red-50 hover:bg-red-100 hover:border-red-300 transition-all shadow-sm">
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <div className="font-medium text-gray-800">代码 {tech.code}: {tech.name}</div>
                              <div className="text-xs text-gray-600">技术规格错误 - 每次扣0.1分</div>
                            </div>
                            <button
                              onClick={() => {
                                if (!movements || !movements[currentMovement]) return;
                                addDeduction(
                                  movements[currentMovement].id,
                                  movements[currentMovement].name,
                                  `[${tech.code}] ${tech.name}`,
                                  tech.points,
                                  ''
                                );
                              }}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-2 md:py-2 rounded-lg transition-colors flex items-center gap-1 md:gap-2 shadow-md text-sm md:text-base min-h-[44px] whitespace-nowrap"
                            >
                              <Minus size={16} />
                              -0.1
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Other deductions */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 text-lg">其他扣分 (Other Deductions)</h4>
                <div className="space-y-2">
                  {otherDeductions.map((category, index) => (
                    <div key={index} className="border-2 border-gray-200 rounded-lg p-3 hover:border-orange-300 hover:bg-orange-50 transition-all shadow-sm">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">代码 {category.code}: {category.name}</div>
                          <div className="text-xs text-gray-600">{category.description}</div>
                        </div>
                        <button
                          onClick={() => {
                            if (!movements || !movements[currentMovement]) return;
                            // const note = prompt('备注 (Optional note):');
                            addDeduction(
                              movements[currentMovement].id,
                              movements[currentMovement].name,
                              `[${category.code}] ${category.name}`,
                              category.value,
                              ''
                            );
                          }}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-3 md:px-4 py-2 md:py-2 rounded-lg transition-colors flex items-center gap-1 md:gap-2 shadow-md text-sm md:text-base min-h-[44px] whitespace-nowrap"
                        >
                          <Minus size={16} />
                          -{category.value}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Movement List */}
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-red-500 pb-2">
              套路动作 (Routine Movements)
            </h3>
            <div className="space-y-2 max-h-[750px] overflow-y-auto">
              {movements && movements.map((movement, index) => (
                <div
                  key={movement.id}
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    currentMovement === index
                      ? 'bg-red-50 border-red-500'
                      : 'bg-gray-50 border-gray-200 hover:border-red-300'
                  }`}
                  onClick={() => setCurrentMovement(index)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        {movement.id}. {movement.name}
                      </div>
                      {movement.techniques.length > 0 && (
                        <div className="text-xs text-gray-600 mt-1">
                          {movement.techniques.map((tech, i) => (
                            <span key={i} className="inline-block bg-yellow-100 px-2 py-1 rounded mr-1">
                              [{tech.code}] {tech.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {deductions.filter(d => d.movementId === movement.id).length > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                        {deductions.filter(d => d.movementId === movement.id).length}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deduction History */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">
              扣分记录 (Deduction History) - 共 {deductions.length} 项
            </h3>
            <div className="flex gap-2">
              <button
                onClick={generateReport}
                className="bg-green-500 hover:bg-green-600 text-white px-3 md:px-4 py-2 md:py-2 rounded-lg flex items-center gap-1 md:gap-2 text-sm md:text-base min-h-[44px]"
              >
                <FileText size={18} />
                生成报告
              </button>
              <button
                onClick={resetAll}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 md:px-4 py-2 md:py-2 rounded-lg flex items-center gap-1 md:gap-2 text-sm md:text-base min-h-[44px]"
              >
                <RotateCcw size={18} />
                重置
              </button>
            </div>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {deductions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">暂无扣分记录 (No deductions recorded)</p>
            ) : (
              deductions.map((deduction) => (
                <div key={deduction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">
                      {deduction.movementName} - {deduction.category}
                    </div>
                    {deduction.note && (
                      <div className="text-sm text-gray-600">备注: {deduction.note}</div>
                    )}
                    <div className="text-xs text-gray-500">{deduction.timestamp}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-red-600">-{deduction.value.toFixed(2)}</span>
                    <button
                      onClick={() => removeDeduction(deduction.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 md:p-2 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Rules Reference */}
        <div className="bg-blue-50 rounded-lg shadow-lg p-4 md:p-6 mt-4">
          <h3 className="text-xl font-bold text-gray-800 mb-3">评分规则参考 (Scoring Rules Reference) - 规定套路 (Compulsory Routine)</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">动作质量评分 (Quality of Movements)</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• 基础分: 7.0分 (规定套路)</li>
                <li>• 动作规格错误: -0.1分/次</li>
                <li>• 其他错误: -0.05至-0.3分/次</li>
                <li>• 最低分: 0分</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">演练水平评分 (Performance)</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• 评分范围: 1.01-3.00分</li>
                <li>• 优秀: 2.51-3.00分</li>
                <li>• 一般: 1.91-2.50分</li>
                <li>• 不好: 1.01-1.90分</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">时间要求 (Time Requirements)</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• 青少年组: 1:10-1:25 (70-85秒)</li>
                <li>• 不足/超出2秒内: -0.1分</li>
                <li>• 不足/超出2-4秒: -0.2分</li>
                <li>• 依此类推递增</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">最终得分 (Final Score)</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• 动作质量分</li>
                <li>• + 演练水平分</li>
                <li>• - 时间扣分</li>
                <li>• = 最终得分 (最高10.00分)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WushuScoringApp;