console.log("Reply Modle..........");

var replyService = (function() {

	

	function add(reply, callback, error) {
		console.log("add reply..........");
		
		jQuery.ajax({
			type : 'post',
			url : '/replies/new',
			data : JSON.stringify(reply),
			contentType : "application/json; charset=utf-8",
			success : function(result, status, xhr) {
				if (callback) {
					callback(result);
				}
			},
			error : function(xhr, status, er) {
				if (error) {
					error(er);
				}
			}
		})
	};
	
	function getList(param, callback, error) {
		var bno = param.bno;
		var page = param.page || 1;
		
		jQuery.getJSON("/replies/pages/" + bno + "/" + page + ".json",
			function(data) {
				if (callback) {
					//callback(data);
					callback(data.replyCnt, data.list);
				}
			}).fail(function(xhr, status, err) {
			if (error) {
				error();
			}
		});
	};
	
	function remove(rno, callback, error) {
		console.log("RNO: " + rno);
	
		jQuery.ajax({
			type : 'delete',
			url : '/replies/' + rno,
			success : function (deleteResult, status, xhr) {
				if (callback) {
					callback(deleteResult);
				}
			},
			error : function (xhr, status, er) {
				if (error) {
					error(er);
				}
			}
		});
	};
	
	function update(reply, callback, error) {
		console.log("RNO: " + reply.rno);
		
		jQuery.ajax({
			type : 'put',
			url : '/replies/' + reply.rno,
			data : JSON.stringify(reply),
			contentType : 'application/json; charset=utf-8',
			success : function (result, status, xhr) {
				if (callback) {
					callback(result);
				}
			},
			error : function (xhr, status, er) {
				if (error) {
					error(er);
				}
			}
		});
	};
	
	function get(rno, callback, error) {
		jQuery.get("/replies/" + rno + ".json",
			function(result) {
				if (callback) {
					callback(result);
				}
			}
		).fail(function(xhr, status, err) {
			if (error) {
				error();
			}
		});
	};
	
	function displayTime(timeValue) {
		var today = new Date();
		
		var gap = today.getTime() - timeValue;
		
		var dataObj = new Date(timeValue);
		var str = "";
		
		if (gap < (1000 * 60 * 60 * 24)) {
			
			var hh = dataObj.getHours();
			var mi = dataObj.getMinutes();
			var ss = dataObj.getSeconds();
			
			return [ (hh > 9 ? '' : '0') + hh, ':', (mi > 9 ? '' : '0') + mi, ':', (ss > 9 ? '' : '0') + ss].join('');
		} else {
			var yy = dataObj.getFullYear();
			var mm = dataObj.getMonth() + 1; // getMonth() is zero-based
			var dd = dataObj.getDate();
			
			return [ yy, '/', (mm > 9 ? '' : '0') + mm, '/', (dd > 9 ? '' : '0') + dd].join('');
		}
	};

	return {
		add:add,
		getList:getList,
		remove : remove,
		update : update,
		get : get,
		displayTime : displayTime
	};
})();